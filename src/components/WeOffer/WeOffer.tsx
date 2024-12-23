import { TCell } from '@/types/types';

const weOfferCellClass =
  'flex-1 px-2 md:px-4 flex flex-col items-center justify-center gap-2 md:grid md:grid-cols-3';
const cellTextClass = 'col-span-2 flex flex-col gap-2';

export default function WeOfferCell(props: TCell) {
  return (
    <div className={weOfferCellClass}>
      <img src={props.img} alt={props.alt} className="place-self-center" />
      <div className={cellTextClass}>
        <h3 className="text-black font-semibold self-center md:self-start">
          {props.title}
        </h3>
        <p className="text-center md:text-start">{props.paragraph}</p>
      </div>
    </div>
  );
}
