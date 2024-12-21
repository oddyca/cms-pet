import { Link } from 'react-router-dom';
import { TBreadCrumbs } from '@/types/types';

export default function Breadcrumbs({ crumbs }: TBreadCrumbs) {
  return (
    <div className="w-full flex gap-4 text-gray-400">
      <Link to="/">Home</Link>
      <p> &gt; </p>
      <Crumbs crumbs={crumbs} />
    </div>
  );
}

const Crumbs = ({ crumbs }: TBreadCrumbs) => {
  let url = '';

  return crumbs.map((crumb: string, id) => {
    url += `${crumb}/`;

    return (
      <div key={crumb} className="flex gap-4">
        <Link
          to={`/blog/${url}`}
          className="hover:text-link-blue-300 duration-300 ease-in-out"
        >
          {crumb === ''
            ? 'Home'
            : crumb.charAt(0).toUpperCase() + crumb.slice(1)}
        </Link>
        {id < crumbs.length - 1 && <p> &gt; </p>}
      </div>
    );
  });
};
