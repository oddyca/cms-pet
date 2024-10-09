import { Link } from 'react-router-dom';

import HorizontallDivider from '../Dividers/HorizontalDivider';
import Tag from '../Tag/Tag';

import { TBigPost } from '@/types/types';

import { convertDate } from '@/controller/controller';

export default function BigPost({
  title,
  article,
  tag,
  slug,
  publishedAt,
  thumbnail,
  placeholderThumbnail,
}: TBigPost) {
  const formattedDate = convertDate(publishedAt);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 h-80 w-full overflow-hidden rounded-md">
          <img
            src={
              placeholderThumbnail ||
              `http://localhost:1337${thumbnail!.data[0].attributes.url}`
            }
            alt="Big post thumbnail"
            className="scale-125 object-cover"
            loading="lazy"
          />
        </div>
        <div className="col-span-2 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-black font-bold">{title}</h2>
            <p>{article.split('.').slice(0, 2).join('. ')}.</p>
            <Link
              to={`/blog/${tag}/${slug}`}
              className="hover:text-link-blue-100"
            >
              Read more &#10141;
            </Link>
          </div>
          <div className="flex place-self-end items-center gap-2 text-sm">
            <p>{formattedDate}</p>
            <p>•</p>
            <Tag tag={tag} elem={'big'} />
          </div>
        </div>
      </div>
      <HorizontallDivider />
    </div>
  );
}
