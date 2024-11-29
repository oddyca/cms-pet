import React, { useState } from 'react';
import { useForm, UseFormSetValue } from 'react-hook-form';
import { TCreatePostForm } from '@/types/types';

import BinIcon from '@/assets/BinIcon';
import CalendarIcon from '@/assets/CalendarIcon';

export default function SchedulePost({
  setValue,
}: {
  setValue: UseFormSetValue<TCreatePostForm>;
}) {
  type TForm = {
    date: string;
    time: string;
  };
  const [isDateSet, setIsDateSet] = useState(false);
  const { register, handleSubmit, getValues, reset } = useForm<TForm>();

  const handleChange = () => {
    const { date, time } = getValues();
    if (date && time) setIsDateSet(true);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    setIsDateSet(false);
  };

  const handleFormSubmit = ({ date, time }: TForm) => {
    const dateToSubmit = new Date(`${date}T${time}`);

    setValue('publishAt', `${dateToSubmit}`);
  };

  return (
    <form
      className="col-span-3 flex flex-col gap-2 w-full"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <p className="self-end">Schedule the post</p>
      <div className="flex flex-col gap-4 border border-1 border-gray-300 shadow-centrif rounded p-4">
        <div className="w-full flex flex-col gap-2">
          <p>Date</p>
          <input
            type="date"
            className="border border-1 rounded border-gray-300 p-2 bg-gray-200"
            {...register('date', { onChange: handleChange })}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p>Time</p>
          <input
            type="time"
            className="border border-1 rounded border-gray-300 p-2 bg-gray-200"
            {...register('time', { onChange: handleChange })}
          />
        </div>
      </div>
      <div className="w-full flex gap-4">
        <button
          type="submit"
          disabled={!isDateSet}
          className="basis-1/2 flex items-center justify-center gap-2 px-4 py-1 border border-1 border-black rounded text-white bg-black disabled:opacity-25 enabled:hover:bg-zinc-600 enabled:hover:border-zinc-600 duration-150"
        >
          <CalendarIcon color="white" />
          Schedule
        </button>
        <button
          className="basis-1/2 flex items-center justify-center gap-2 px-3 py-1 border border-1 border-black rounded hover:border-gray-400 duration-150"
          onClick={handleClear}
        >
          <BinIcon color="black" />
          Clear
        </button>
      </div>
    </form>
  );
}
