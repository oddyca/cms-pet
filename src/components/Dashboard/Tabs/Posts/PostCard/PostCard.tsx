import { Link } from 'react-router-dom';

import { TBigPost } from '@/types/types';
import PostTag from './PostTag';

import EditIcon from '@/assets/EditIcon';

import { convertDate } from '@/controller/controller';

export default function PostCard({
  title,
  tag,
  slug,
  publishedAt,
  thumbnail,
  placeholderThumbnail,
}: TBigPost) {
  return (
    <div className="my-2 h-40 p-2 rounded border border-gray-300 flex gap-2 overflow-hidden">
      <div className="basis-1/4 overflow-hidden rounded">
        <img
          className="object-cover w-full h-full"
          src={
            placeholderThumbnail ||
            `http://localhost:1337${thumbnail!.data[0].attributes.url}`
          }
        />
      </div>
      <div className="basis-3/4 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="flex items-center gap-2 text-sm">
            <p>{convertDate(publishedAt)}</p>
            <PostTag tag={tag} />
          </div>
        </div>
        <div className="flex justify-between">
          <div></div>
          <div className="flex gap-6 items-center">
            <Link to={`${slug}`}>
              <EditIcon color="gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}