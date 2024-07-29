import VerticalDivider from '../Dividers/VerticalDivider';

import { TCell } from '../../types/types';

export default function FeaturedCompanies(props: TCell) {
  return (
    <div className="w-[90%] grid grid-cols-2 py-6">
      <img src={props.img} alt={props.alt} />
      <div className="flex gap-6 items-center">
        <VerticalDivider />
        <p>{props.paragraph}</p>
      </div>
    </div>
  );
}
