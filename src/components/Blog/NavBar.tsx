import { NavLink } from 'react-router-dom';
import VerticalDivider from '../Dividers/VerticalDivider';
import HorizontallDivider from '../Dividers/HorizontalDivider';

import { TBlogNavBar } from '@/types/types';

const categories = [
  { name: 'FRONT PAGE', slug: 'front-page' },
  { name: 'MENTIONS', slug: 'mentions' },
  { name: 'ARTICLES', slug: 'articles' },
  { name: 'OUR IDEAS', slug: 'ideas' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'block w-full bg-accent-purple-100' : 'w-full';

const renderNavBar = (arr: TBlogNavBar[]) => {
  return arr.map((category: TBlogNavBar, id) => (
    <li
      className="flex items-center w-full text-center hover:bg-accent-purple-100"
      key={category.slug}
    >
      {id > 0 && id <= arr.length - 1 && <VerticalDivider />}
      <NavLink
        to={`/blog${category.slug === 'front-page' ? '' : '/' + category.slug}`}
        className={navLinkClass}
        end={category.slug === 'front-page'}
      >
        {category.name}
      </NavLink>
    </li>
  ));
};

export default function NavBar() {
  return (
    <div>
      <HorizontallDivider />
      <ul className="grid grid-cols-4 justify-items-stretch list-none py-4">
        {renderNavBar(categories)}
      </ul>
      <HorizontallDivider />
    </div>
  );
}
