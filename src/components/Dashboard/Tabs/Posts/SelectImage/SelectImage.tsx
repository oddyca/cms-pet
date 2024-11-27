import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseFormRegister } from 'react-hook-form';

import { RootState } from '@/state/store/store';
import { setImage, resetImage } from '@/state/store/slices/updateImageSlice';
import { TCreatePostForm } from '@/types/types';

import EditIcon from '@/assets/EditIcon';

function Input({
  reg,
  register,
  handleImageSelect,
}: {
  reg: boolean;
  register?: UseFormRegister<TCreatePostForm>;
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (reg)
    return (
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="absolute inset-0 opacity-0 z-20 cursor-pointer"
        {...register!('img', {
          required: 'Image is required.',
          onChange: (e) => {
            handleImageSelect(e);
          },
        })}
      />
    );

  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      className="absolute inset-0 opacity-0 z-20 cursor-pointer"
      onChange={handleImageSelect}
    />
  );
}

export default function SelectImage({
  defaultImage,
  register,
}: {
  defaultImage: string;
  register?: UseFormRegister<TCreatePostForm>;
}) {
  useEffect(
    () => () => {
      dispatch(resetImage());
    },
    [],
  );

  const storeImage = useSelector(
    (state: RootState) => state.updateImageSlice.value.image,
  );
  const dispatch = useDispatch();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target.files) return;
    const imageFileBlop = URL.createObjectURL(e.target.files[0]);

    dispatch(setImage(imageFileBlop));
  };

  const containerClass =
    defaultImage || storeImage ? 'relative' : 'absolute inset-2';

  return (
    <div className={containerClass}>
      <img
        className="w-full object-cover"
        loading="lazy"
        src={storeImage ? storeImage : defaultImage}
      />
      <div className="hidden absolute inset-0 group-hover:flex group-hover:bg-white/[0.7] justify-center items-center z-10">
        <div className="self-center flex gap-2 items-center">
          <EditIcon color="gray-500" />
          <p className="font-semibold text-gray-500">CHANGE IMAGE</p>
        </div>
      </div>
      {register ? (
        <Input
          reg={true}
          register={register}
          handleImageSelect={handleImageSelect}
        />
      ) : (
        <Input reg={false} handleImageSelect={handleImageSelect} />
      )}
    </div>
  );
}
