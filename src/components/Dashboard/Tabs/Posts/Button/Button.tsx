export default function Button({ bg, btn }: { bg?: string; btn: string }) {
  console.log('bg, btn', bg, btn);
  const btnClass =
    bg === undefined
      ? 'rounded px-4 py-1 border border-1 border-black bg-white'
      : `rounded px-4 py-1 border border-1 border-black bg-${bg} text-white`;
  return <button className={btnClass}>{btn}</button>;
}
