import { Link, NavLink } from 'react-router-dom';
import HorizontallDivider from '../Dividers/HorizontalDivider';

import { TBigPost } from '../../types/types';

export default function BigPost({
  title,
  content,
  tag,
  publishedAt,
  placeholderThumbnail,
}: TBigPost) {
  const postDate = new Date(publishedAt);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = postDate.toLocaleDateString('en-US', options);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-80 w-full overflow-hidden rounded">
          <img
            src={placeholderThumbnail}
            alt="Big post thumbnail"
            className="scale-125 object-cover"
            loading="lazy"
          />
        </div>
        <div className="col-span-1 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl text-black font-bold">{title}</h2>
            <p>{content.slice(0, 64)}...</p>
            <Link to="/" className="hover:text-link-blue-100">
              Read more &#10141;
            </Link>
          </div>
          <div className="flex place-self-end items-center gap-2 text-sm">
            <p>{formattedDate}</p>
            <p>•</p>
            <NavLink
              to="/blog/mentions"
              className="px-4 py-1 border rounded-full border-black hover:text-link-blue-100 hover:border-link-blue-100"
            >
              {tag}
            </NavLink>
          </div>
        </div>
      </div>
      <HorizontallDivider />
    </div>
  );
}
