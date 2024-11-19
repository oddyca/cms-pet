import React, { useRef } from 'react';
import Button from '../Button/Button';
import { useMutation } from '@tanstack/react-query';
import { updateEntry } from '@/services/updateServices';
import { TPost } from '@/types/types';
import { setPostInfo } from '@/state/store/slices/postEditSlice';
import { setCategory } from '@/state/store/slices/dashboardFilterSlice';
import { useDispatch } from 'react-redux';
import { useHashText } from '@/hooks/useHashText';
import Loader from '@/components/Dashboard/Loader';

export default function ButtonsPanel({
  handlePreviewClick,
  category,
  post,
  introText,
  contentText,
  postID,
  setSuccessfulReqMessage,
}: {
  handlePreviewClick: () => void;
  category: string;
  post: TPost['attributes'];
  introText?: string;
  contentText: string;
  postID: number;
  setSuccessfulReqMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useDispatch();
  const mutationUpdateEntry = useMutation({
    mutationFn: updateEntry,
  });

  // Save changes
  const handleSaveChanges = () => {
    const updatedPostData = {
      title: post.title,
      tag: category || post.tag,
      intro: introText || '',
      article: contentText,
      edited: new Date(),
    };
    try {
      mutationUpdateEntry.mutate({
        entryID: postID,
        entryData: updatedPostData,
      });
      if (mutationUpdateEntry.isSuccess) {
        setSuccessfulReqMessage('Changes Saved!');
      }
      setTimeout(() => setSuccessfulReqMessage(''), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    dispatch(setPostInfo({ type: 'intro', text: post.intro }));
    dispatch(setPostInfo({ type: 'content', text: post.article }));
    dispatch(setCategory(post.tag));
  };

  // isEdited logic
  const initialDataRef = useRef({
    intro: post.intro,
    content: post.article,
    category: post.tag,
  });

  const isIntroEdited =
    initialDataRef.current.intro &&
    useHashText(introText || initialDataRef.current.intro) !==
      useHashText(initialDataRef.current.intro);

  const isContentEdited =
    initialDataRef.current.content &&
    useHashText(contentText || initialDataRef.current.content) !==
      useHashText(initialDataRef.current.content);

  const isCategoryEdited =
    category !== '' && category !== initialDataRef.current.category;

  const isEdited =
    initialDataRef.current.intro !== undefined &&
    initialDataRef.current.content !== undefined &&
    (isIntroEdited || isContentEdited || isCategoryEdited);

  return (
    <div className="flex justify-end gap-4">
      <Button btn="Preview" disabled={false} onClick={handlePreviewClick} />
      <Button
        btn="Cancel"
        disabled={!isEdited || mutationUpdateEntry.isPending}
        onClick={handleCancel}
      />
      <Button
        bg="accent-purple-300"
        btn={mutationUpdateEntry.isPending ? <Loader /> : 'Save Changes'}
        disabled={!isEdited || mutationUpdateEntry.isPending}
        onClick={handleSaveChanges}
      />
    </div>
  );
}
