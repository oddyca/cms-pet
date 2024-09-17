import { NavLink } from 'react-router-dom';

export default function Tag({ tag, elem = '' }: { tag: string; elem: string }) {
  return (
    <NavLink
      to={`/blog/${tag.toLowerCase()}`}
      className={`px-4 py-1 border rounded-full ${elem === 'big' ? 'border-black' : 'border-white'} hover:text-link-blue-100 hover:border-link-blue-100`}
    >
      {tag}
    </NavLink>
  );
}
