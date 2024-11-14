import EyeIcon from '@/assets/EyeIcon';
import { ReactNode } from 'react';

export default function Button({
  bg,
  btn,
  disabled,
  onClick,
}: {
  bg?: string;
  btn: string | ReactNode;
  disabled: boolean;
  onClick?: () => void;
}) {
  const btnClass =
    bg === undefined
      ? 'flex gap-2 items-center justify-center rounded px-4 py-1 border border-1 border-black bg-white disabled:opacity-55 hover:brightness-105 shadow-centrif'
      : `min-w-32 flex gap-2 items-center justify-center rounded px-4 py-1 border border-1 border-${bg} bg-${bg} text-white disabled:opacity-55 hover:brightness-105 shadow-centrif`;

  return (
    <button className={btnClass} disabled={disabled} onClick={onClick}>
      {btn === 'Preview' && <EyeIcon color="black" />}
      {btn}
    </button>
  );
}
