import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import EditIcon from '@/assets/EditIcon';

import { uploadImage } from '@/services/updateServices';

export default function SelectImage({
  id,
  defaultImage,
}: {
  id: number;
  defaultImage: string;
}) {
  const [image, setImage] = useState<string>(defaultImage);
  const mutationUploadImage = useMutation({
    mutationFn: (target: HTMLInputElement) => uploadImage(id, target),
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target.files) return;
    const imageFile = e.target.files[0];
    setImage(URL.createObjectURL(imageFile));

    mutationUploadImage.mutate(e.target);
  };

  return (
    <div className="relative">
      <img className="w-full object-cover" loading="lazy" src={image} />
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
