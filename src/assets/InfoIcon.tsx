export default function InfoIcon({ fillColor }: { fillColor: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={`text-${fillColor} cursor-pointer`}
    >
      <path
        fill="none"
        d="M10 9V14M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19ZM10.0498 6V6.1L9.9502 6.1002V6H10.0498Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
