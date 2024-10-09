import { TCell } from '@/types/types';

const weOfferCellClass = 'flex-1 px-4 grid grid-cols-3';
const cellTextClass = 'col-span-2 flex flex-col gap-2';

export default function WeOfferCell(props: TCell) {
  return (
    <div className={weOfferCellClass}>
      <img src={props.img} alt={props.alt} className="place-self-center" />
      <div className={cellTextClass}>
        <h3 className="text-black font-semibold">{props.title}</h3>
        <p>{props.paragraph}</p>
      </div>
    </div>
  );
}
