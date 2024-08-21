import { NavLink } from 'react-router-dom';
import VerticalDivider from '../Dividers/VerticalDivider';
import HorizontallDivider from '../Dividers/HorizontalDivider';

import { TBlogNavBar } from '../../types/types';

const tags = [
  { name: 'FRONT PAGE', slug: 'front-page' },
  { name: 'MENTIONS', slug: 'mentions' },
  { name: 'ARTICLES', slug: 'articles' },
  { name: 'OUR IDEAS', slug: 'our-ideas' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'block w-full bg-accent-purple-100' : 'w-full';

const renderNavBar = (arr: TBlogNavBar[]) => {
  return arr.map((tag: TBlogNavBar, id) => (
    <li
      className="flex items-center w-full text-center hover:bg-accent-purple-100"
      key={tag.slug}
    >
      {id > 0 && id <= arr.length - 1 && <VerticalDivider />}
      <NavLink
        to={`/blog${tag.slug === 'front-page' ? '' : '/' + tag.slug}`}
        className={navLinkClass}
      >
        {tag.name}
      </NavLink>
    </li>
  ));
};

export default function NavBar() {
  return (
    <div>
      <HorizontallDivider />
      <ul className="grid grid-cols-4 justify-items-stretch list-none py-4">
        {renderNavBar(tags)}
      </ul>
      <HorizontallDivider />
    </div>
  );
}
