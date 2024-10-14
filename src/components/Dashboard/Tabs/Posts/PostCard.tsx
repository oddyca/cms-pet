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
    <div className="w-full p-2 rounded border border-black flex justify-between">
      <p>{title}</p>
      <p>{tag}</p>
    </div>
  );
}
