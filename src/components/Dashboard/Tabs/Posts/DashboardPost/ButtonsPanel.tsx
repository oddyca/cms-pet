import React, { useRef, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { updateEntry, uploadImage } from '@/services/updateServices';
import { setPostInfo } from '@/state/store/slices/postEditSlice';
import { setCategory } from '@/state/store/slices/dashboardFilterSlice';
import { useHashText } from '@/hooks/useHashText';

import { TPost } from '@/types/types';
import { RootState } from '@/state/store/store';

import Button from '../Button/Button';
import Loader from '@/components/Dashboard/Loader';

export default function ButtonsPanel({
  handlePreviewClick,
  category,
  post,
  introText,
  contentText,
  postID,
  imageURL,
  setSuccessfulReqMessage,
}: {
  handlePreviewClick: () => void;
  category: string;
  post: TPost['attributes'];
  introText?: string;
  contentText: string;
  imageURL: string;
  postID: number;
  setSuccessfulReqMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isEditedBool, setIsEditedBool] = useState(false);
  const dispatch = useDispatch();
  const mutationUpdateEntry = useMutation({
    mutationFn: updateEntry,
  });
  const mutationUploadImage = useMutation({
    mutationFn: (imgBlop: string) => uploadImage(postID, imgBlop),
  });

  const storeImage = useSelector(
    (state: RootState) => state.updateImageSlice.value.image,
  );

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
      mutationUploadImage.mutate(storeImage);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (mutationUpdateEntry.isSuccess && mutationUploadImage.isSuccess) {
      setSuccessfulReqMessage('Changes Saved!');
      setIsEditedBool(false);
      setTimeout(() => setSuccessfulReqMessage(''), 2000);
    }
  }, [mutationUpdateEntry.isSuccess, mutationUploadImage.isSuccess]);

  const handleCancel = () => {
    dispatch(setPostInfo({ type: 'intro', text: post.intro }));
    dispatch(setPostInfo({ type: 'content', text: post.article }));
    dispatch(setCategory(post.tag));
  };

  const initialDataRef = useRef({
    intro: post.intro,
    content: post.article,
    category: post.tag,
  });

  const hashedIntroText =
    initialDataRef.current.intro &&
    useHashText(introText || initialDataRef.current.intro);
  const hashedInitialIntro =
    initialDataRef.current.intro && useHashText(initialDataRef.current.intro);

  const hashedContentText = useHashText(
    contentText || initialDataRef.current.content,
  );
  const hashedInitialContent = useHashText(initialDataRef.current.content);

  useEffect(() => {
    const isIntroEdited =
      initialDataRef.current.intro && hashedIntroText !== hashedInitialIntro;

    const isContentEdited =
      initialDataRef.current.content &&
      hashedContentText !== hashedInitialContent;

    const isCategoryEdited =
      category !== '' && category !== initialDataRef.current.category;

    const isEdited =
      initialDataRef.current.intro !== undefined &&
      initialDataRef.current.content !== undefined &&
      (Boolean(imageURL) ||
        isIntroEdited ||
        isContentEdited ||
        isCategoryEdited);

    setIsEditedBool(isEdited);
  }, [
    hashedIntroText,
    hashedInitialIntro,
    hashedContentText,
    hashedInitialContent,
    imageURL,
    category,
  ]);

  return (
    <div className="flex justify-end gap-4">
      <Button btn="Preview" disabled={false} onClick={handlePreviewClick} />
      <Button
        btn="Cancel"
        disabled={!isEditedBool || mutationUpdateEntry.isPending}
        onClick={handleCancel}
      />
      <Button
        bg="accent-purple-300"
        btn={mutationUpdateEntry.isPending ? <Loader /> : 'Save Changes'}
        disabled={!isEditedBool || mutationUpdateEntry.isPending}
        onClick={handleSaveChanges}
      />
    </div>
  );
}
