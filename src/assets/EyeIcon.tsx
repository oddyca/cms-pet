export default function EyeIcon({ color }: { color: string }) {
  return (
    <svg
      className={`text-${color} hover:cursor-pointer`}
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
    >
      <path
        d="M2.58631 8.77881C4.36575 10.5478 7.46904 12.9999 10.9997 12.9999C14.5303 12.9999 17.6331 10.5478 19.4125 8.77881C19.8818 8.31226 20.1172 8.07819 20.2667 7.62012C20.3733 7.29328 20.3733 6.70674 20.2667 6.3799C20.1172 5.92181 19.8818 5.6877 19.4125 5.22111C17.633 3.45208 14.5303 1 10.9997 1C7.46904 1 4.36575 3.45208 2.58631 5.22111C2.11665 5.68802 1.8818 5.92165 1.73231 6.3799C1.62569 6.70673 1.62569 7.29328 1.73231 7.62012C1.8818 8.07837 2.11665 8.31189 2.58631 8.77881Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99951 7C8.99951 8.10457 9.89494 9 10.9995 9C12.1041 9 12.9995 8.10457 12.9995 7C12.9995 5.89543 12.1041 5 10.9995 5C9.89494 5 8.99951 5.89543 8.99951 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
