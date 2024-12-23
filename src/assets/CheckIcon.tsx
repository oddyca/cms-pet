export default function CheckIcon({ color }: { color?: string }) {
  return (
    <svg
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
      className={`text-${color}`}
    >
      <path
        d="M1 6L5.24264 10.2426L13.727 1.75732"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
