import { NavLink } from 'react-router-dom';
import VerticalDivider from '../../Dividers/VerticalDivider';
import HorizontallDivider from '../../Dividers/HorizontalDivider';

import { getAllTags } from '@/services/fetchServices';

import { TBlogNavBar, TTag } from '@/types/types';
import { useEffect, useState } from 'react';
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
  const categoriesMap = new Map();

  const [allCategories, setAllCategories] = useState<TBlogNavBar[]>([]);

  useEffect(() => {
    getAllTags().then((res) => {
      res.data.map((tag: TTag) => {
        const capTag = tag.attributes.tag.toUpperCase();
        const tagName = capTag === 'IDEAS' ? 'OUR IDEAS' : capTag;

        if (!categoriesMap.has(capTag)) {
          categoriesMap.set(capTag, {
            name: tagName,
            slug: capTag.toLowerCase(),
          });
        }
      });
      const mapObj = Object.values(
        Object.fromEntries(categoriesMap.entries()),
      ) as TBlogNavBar[];
      setAllCategories([
        { name: 'FRONT PAGES', slug: 'front-page' },
        ...mapObj,
      ]);
    });
  }, []);

  return (
    <div>
      <HorizontallDivider />
      <ul className="grid grid-cols-4 justify-items-stretch list-none py-4">
        {allCategories.length > 0 && renderNavBar(allCategories)}
      </ul>
      <HorizontallDivider />
    </div>
  );
}
