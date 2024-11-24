import React from 'react';

export default function CreatePostButtonPanel({
  handleCreateDraft,
  isDraftCreated,
}) {
  return (
    <div className="col-span-6 place-self-end flex gap-4">
      <button
        className="rounded border border-1 border-gray-300 px-4 py-2"
        onClick={() => {
          handleCreateDraft();
        }}
      >
        CREATE DRAFT
      </button>
      <button
        disabled={!isDraftCreated}
        className="rounded border border-1 border-gray-300 px-4 py-2 enabled:cursor-pointer disabled:opacity-75"
      >
        Publish
      </button>
    </div>
  );
}
