export default function ArrowIcon({
  color,
  isOpen,
}: {
  color?: string;
  isOpen: boolean;
}) {
  return (
    <svg
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="none"
      className={
        isOpen ? `${color} rotate-180 duration-300` : `${color} duration-300`
      }
    >
      <path
        d="M9 1.2489L5 5.2489L1 1.2489"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
