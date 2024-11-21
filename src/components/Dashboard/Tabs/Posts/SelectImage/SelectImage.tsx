import React from 'react';
import EditIcon from '@/assets/EditIcon';
import { RootState } from '@/state/store/store';
import { setImage } from '@/state/store/slices/updateImageSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SelectImage({
  defaultImage,
}: {
  defaultImage: string;
}) {
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

  return (
    <div className="relative">
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
      <input
        onChange={handleImageSelect}
        type="file"
        accept="image/png, image/jpeg"
        name="selectImage"
        className="absolute inset-0 z-20 opacity-0 cursor-pointer"
      />
    </div>
  );
}
