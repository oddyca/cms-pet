export default function CloseIcon({ color }: { color?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`text-${color} hover:cursor-pointer`}
    >
      <path
        d="M13 13L7.00002 7.00002M7.00002 7.00002L1 1M7.00002 7.00002L13 1M7.00002 7.00002L1 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
