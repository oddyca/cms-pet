import { NavLink } from 'react-router-dom';
import VerticalDivider from '../../Dividers/VerticalDivider';
import HorizontallDivider from '../../Dividers/HorizontalDivider';

import { TBlogNavBar } from '../../../types/types';

const tags = [
  { name: 'FRONT PAGE', slug: 'front-page' },
  { name: 'MENTIONS', slug: 'mentions' },
  { name: 'ARTICLES', slug: 'articles' },
  { name: 'OUR IDEAS', slug: 'our-ideas' },
];

const renderNavBar = (arr: TBlogNavBar[]) => {
  return arr.map((tag: TBlogNavBar, id) => (
    <div
      className="flex hover:cursor-pointer hover:bg-accent-purple-100"
      key={tag.slug}
    >
      {id > 0 && id <= arr.length - 1 && <VerticalDivider />}
      <li className="my-0 mx-auto">
        <NavLink to={`/blog/${tag.slug}`}>{tag.name}</NavLink>
      </li>
    </div>
  ));
};

export default function NavBar() {
  return (
    <div>
      <HorizontallDivider />
      <ul
        className={`grid grid-cols-${tags.length} justify-items-stretch list-none py-4`}
      >
        {renderNavBar(tags)}
      </ul>
      <HorizontallDivider />
    </div>
  );
}
