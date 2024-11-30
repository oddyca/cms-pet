import Button from '../Button/Button';

export default function CreatePostButtonPanel({
  isDraftCreated,
  handlePreviewClick,
}: {
  isDraftCreated: boolean;
  handlePreviewClick: () => void;
}) {
  return (
    <div className="col-span-10 place-self-end flex gap-4">
      <Button btn="Preview" disabled={false} onClick={handlePreviewClick} />

      <button
        className="rounded border border-1 border-black px-4 py-2 hover:border-gray-400"
        type="submit"
      >
        CREATE DRAFT
      </button>
      <button
        disabled={!isDraftCreated}
        className="rounded border border-1 border-black px-4 py-2 enabled:cursor-pointer enabled:bg-green-600 hover:border-gray-400 disabled:opacity-75 disabled:border-gray-400"
      >
        Publish
      </button>
    </div>
  );
}
