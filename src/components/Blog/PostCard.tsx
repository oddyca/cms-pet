import { Link } from 'react-router-dom';

import Tag from '../Tag/Tag';

import { TPostCard } from '../../types/types';

import { convertDate } from '../../controller/controller';

export default function PostCard({
  title,
  tag,
  content,
  slug,
  publishedAt,
  thumbnail,
  placeholderThumbnail,
}: TPostCard) {
  const formattedDate = convertDate(publishedAt);

  return (
    <div className="border border-2 rounded-md col-span-1 flex flex-col gap-2 overflow-hidden">
      <img
        className="h-1/2 object-cover flex-1"
        src={
          placeholderThumbnail ??
          `http://localhost:1337${thumbnail!.data[0].attributes.url}`
        }
      />
      <div className="p-2 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Link
            to={`/blog/${tag.toLowerCase()}/${slug}`}
            className="font-bold hover:text-link-blue-100 text-xl"
          >
            {title}
          </Link>
          <p>{content.split('.')[0]}.</p>
        </div>
        <div className="flex justify-end items-center text-sm gap-2">
          <p>{formattedDate}</p>
          <p>•</p>
          <Tag tag={tag} />
        </div>
      </div>
    </div>
  );
}
