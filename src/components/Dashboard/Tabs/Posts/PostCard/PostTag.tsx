import { useDispatch } from 'react-redux';
import { setCategory } from '@/state/store/slices/categorySelectionSlice';

export default function Tag({ tag }: { tag: string }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(setCategory(tag))}
      className="px-4 py-1 border rounded-full border-black hover:text-link-blue-100 hover:border-link-blue-100"
    >
      {tag.charAt(0).toUpperCase() + tag.slice(1)}
    </button>
  );
}
