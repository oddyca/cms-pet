export default function HorizontallDivider({ color }: { color?: string }) {
  const className = `w-full h-[2px] ${color ? `bg-${color}` : 'bg-black'}`;
  return <div className={className} />;
}
