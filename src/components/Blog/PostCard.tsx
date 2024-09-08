import { Link } from 'react-router-dom';

import Tag from '../Tag/Tag';

import { TPostCard } from '../../types/types';

import { convertDate } from '../../controller/controller';

export default function PostCard({
  title,
  tag,
  slug,
  publishedAt,
  thumbnail,
  placeholderThumbnail,
}: TPostCard) {
  const formattedDate = convertDate(publishedAt);

  return (
    <div className="border border-2 rounded col-span-1 flex flex-col gap-2 overflow-hidden">
      <img
        src={
          placeholderThumbnail ??
          `http://localhost:1337${thumbnail!.data[0].attributes.url}`
        }
      />
      <div className="p-2 flex flex-col gap-4">
        <Link
          to={`/blog/${slug}`}
          className="font-bold hover:text-link-blue-100"
        >
          {title}
        </Link>
        <div className="flex justify-between text-sm">
          <p>{formattedDate}</p>
          <Tag tag={tag} />
        </div>
      </div>
    </div>
  );
}
