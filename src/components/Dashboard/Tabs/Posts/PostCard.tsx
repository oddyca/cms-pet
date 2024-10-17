import { TBigPost } from '@/types/types';

export default function PostCard({
  title,
  article,
  tag,
  slug,
  publishedAt,
  thumbnail,
  placeholderThumbnail,
}: TBigPost) {
  return (
    <div className="my-2 h-40 p-2 rounded border border-black grid grid-cols-3 overflow-hidden">
      <div className="col-span-1 overflow-hidden">
        <img
          className="object-cover "
          src={
            placeholderThumbnail ||
            `http://localhost:1337${thumbnail!.data[0].attributes.url}`
          }
        />
      </div>
      <div className="col-span-2">
        <p>{title}</p>
        <p>{tag}</p>
      </div>
    </div>
  );
}
