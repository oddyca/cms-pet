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
    <div className="h-96 relative border-2 rounded-md col-span-1 overflow-hidden">
      <img
        className="h-full w-full object-cover"
        src={
          placeholderThumbnail ||
          `http://localhost:1337${thumbnail!.data[0].attributes.url}`
        }
        loading="lazy"
      />
      <div className="absolute p-2 bottom-0 flex flex-col justify-between gap-4 z-10">
        <div className="flex flex-col gap-2 z-10">
          <Link
            to={`/blog/${tag.toLowerCase()}/${slug}`}
            className="font-bold hover:text-link-blue-100 text-xl text-white"
          >
            {title}
          </Link>
          <p className="text-white z-10">{content.split('.')[0]}.</p>
        </div>
        <div className="flex justify-end items-center text-sm gap-2 z-10 text-white">
          <p>{formattedDate}</p>
          <p>•</p>
          <Tag tag={tag} />
        </div>
      </div>
      <div className="absolute h-1/2 hover:h-full w-full bottom-0 bg-gradient-to-t from-black to-none z-1" />
    </div>
  );
}
