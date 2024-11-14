import { Link } from 'react-router-dom';

import Tag from '../Tag/Tag';

import { TPostCard } from '@/types/types';

import { convertDate } from '@/utils/dateUtils';

export default function PostCard({
  title,
  tag,
  article,
  slug,
  publishedAt,
  thumbnail,
  placeholderThumbnail,
}: TPostCard) {
  const formattedDate = convertDate(publishedAt);

  return (
    <div className="h-96 relative border-2 rounded-xl col-span-1 overflow-hidden group">
      <img
        className="h-full w-full object-cover duration-300 ease-in-out group-hover:scale-110"
        src={
          placeholderThumbnail ||
          `http://localhost:1337${thumbnail!.data.attributes.url}`
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
          <p className="text-white z-10">{article.split('.')[0]}.</p>
        </div>
        <div className="flex justify-end items-center text-sm gap-2 z-10 text-white opacity-50 group-hover:opacity-100">
          <p>{formattedDate}</p>
          <p>•</p>
          <Tag tag={tag} elem={'card'} />
        </div>
      </div>
      <div className="absolute h-1/2 group-hover:h-full w-full duration-300 ease-in-out bottom-0 bg-gradient-to-t from-black to-transparent z-1" />
    </div>
  );
}
