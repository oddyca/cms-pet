export default function Logo({ fillColor }: { fillColor?: string }) {
  return (
    <svg
      width="39"
      height="33"
      viewBox="0 0 39 33"
      fill="none"
      className={`${fillColor} inline`}
    >
      <path
        d="M19.0526 13L26.8468 26.5H11.2583L19.0526 13Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7432 4L19.0526 0L21.362 4L34.641 27H30.0222L19.0526 8L8.0829 27H3.4641L16.7432 4ZM2.3094 29L0 33H4.6188H33.4863H38.1051L35.7957 29H31.1769H6.9282H2.3094Z"
        fill="currentColor"
      />
    </svg>
  );
}
