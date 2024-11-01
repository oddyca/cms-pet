export default function Button({
  bg,
  btn,
  disabled,
}: {
  bg?: string;
  btn: string;
  disabled: boolean;
}) {
  const btnClass =
    bg === undefined
      ? 'rounded px-4 py-1 border border-1 border-black bg-white disabled:opacity-55'
      : `rounded px-4 py-1 border border-1 border-black bg-${bg} text-white disabled:opacity-55`;
  return (
    <button className={btnClass} disabled={disabled}>
      {btn}
    </button>
  );
}
