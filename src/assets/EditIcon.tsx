export default function EditIcon({ color }: { color: string }) {
  return (
    <svg
      className={`text-${color} hover:brightness-50 duration-100 hover:cursor-pointer`}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M9 5.00012L1 13.0001V17.0001L5 17.0001L13 9.0001M9 5.00012L11.8686 2.13146L11.8704 2.12976C12.2652 1.73488 12.463 1.53709 12.691 1.46301C12.8919 1.39775 13.1082 1.39775 13.3091 1.46301C13.5369 1.53704 13.7345 1.7346 14.1288 2.12892L15.8686 3.86872C16.2646 4.26474 16.4627 4.46284 16.5369 4.69117C16.6022 4.89201 16.6021 5.10835 16.5369 5.3092C16.4628 5.53736 16.265 5.73516 15.8695 6.13061L15.8686 6.13146L13 9.0001M9 5.00012L13 9.0001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
