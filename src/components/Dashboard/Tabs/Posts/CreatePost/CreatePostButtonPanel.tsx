import React from 'react';
import { TPublishEntry } from '@/types/types';
import Button from '../Button/Button';
import { publishDraft } from '@/services/updateServices';
import { useMutation } from '@tanstack/react-query';
import { UseFormGetValues } from 'react-hook-form';

export default function CreatePostButtonPanel({
  isDraftCreated,
  handlePreviewClick,
  draftID,
  getValues,
}: {
  isDraftCreated: boolean;
  handlePreviewClick: () => void;
  draftID: number | null;
  getValues: UseFormGetValues<TPublishEntry['draftData']>;
}) {
  const mutationUpdateEntry = useMutation({
    mutationFn: publishDraft,
  });

  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dataToPublish = getValues();

    if (draftID) {
      try {
        mutationUpdateEntry.mutate({
          draftID: draftID,
          draftData: {
            ...dataToPublish,
            publishedAt: dataToPublish.publishAt || new Date(),
            publishAt: undefined,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

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
        className="rounded border border-1 border-black px-4 py-2 enabled:cursor-pointer enabled:bg-green-600 enabled:text-white enabled:border-green-600 hover:border-gray-400 disabled:opacity-75 disabled:border-gray-400"
        onClick={handlePublish}
      >
        Publish
      </button>
    </div>
  );
}
