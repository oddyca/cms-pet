import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategory } from '@/state/store/slices/dashboardFilterSlice';
import { RootState } from '@/state/store/store';

import ArrowIcon from '@/assets/ArrowIcon';

export default function Dropwdown({
  menuOptions,
  defaultCat,
}: {
  menuOptions: string[];
  defaultCat?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const category = useSelector(
    (state: RootState) => state.dashboardCategoryFilter.value,
  );

  const listOptions = () => {
    return menuOptions.map((option) => (
      <li
        key={option}
        onClick={() => dispatch(setCategory(option))}
        className={`${category === option ? 'bg-accent-blue-100 cursor-default p-2' : 'hover:bg-gray-300 p-2'}`}
      >
        {option}
      </li>
    ));
  };

  return (
    <div
      className="relative flex gap-2 items-center cursor-pointer"
      onClick={() => setIsOpen((state) => !state)}
    >
      <div className="flex gap-2 items-center">
        <li className="list-none">{category || defaultCat}</li>
        <ArrowIcon isOpen={isOpen} />
      </div>
      <ul
        className={
          isOpen
            ? 'absolute top-8 left-0 bg-white rounded border border-1 border-gray-300 flex flex-col gap-2 duration-150 w-fit min-w-64 max-h-48 overflow-hidden shadow-centrif z-10'
            : 'max-h-0 absolute top-6 left-0 bg-white'
        }
      >
        {isOpen ? listOptions() : ''}
      </ul>
    </div>
  );
}
