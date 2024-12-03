import React, { useState } from 'react';
import { useForm, UseFormSetValue } from 'react-hook-form';
import { TCreatePostForm } from '@/types/types';

import BinIcon from '@/assets/BinIcon';
import CalendarIcon from '@/assets/CalendarIcon';

export default function SchedulePost({
  parentSetValue,
}: {
  parentSetValue: UseFormSetValue<TCreatePostForm>;
}) {
  type TForm = {
    date: string;
    time: string;
    hour: string;
    minutes: string;
  };
  const [isDateSet, setIsDateSet] = useState(false);
  const { register, handleSubmit, getValues, reset, setValue } = useForm<TForm>(
    {
      defaultValues: {
        date: '',
        time: '00:00',
      },
    },
  );

  const handleChange = () => {
    const { date, time } = getValues();
    const newDate = new Date();
    const formDate = new Date(date);
    if (formDate <= newDate) {
      setValue('date', newDate.toISOString().split('T')[0]);
    }

    if (getValues().date && time) setIsDateSet(true);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    setIsDateSet(false);
  };

  const handleFormSubmit = ({ date, time }: TForm) => {
    const dateToSubmit = new Date(`${date}T${time}`);
    parentSetValue('publishAt', dateToSubmit);
  };

  const renderHourOptions = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i < 10 ? `0${i}` : i);
    }
    return hours.map((hour) => (
      <option key={`hour-${hour}`} value={hour}>
        {hour}
      </option>
    ));
  };

  const renderMinutesOptions = () => {
    const minutes = [];
    for (let i = 0; i < 60; i += 15) {
      minutes.push(i < 10 ? `0${i}` : i);
    }
    return minutes.map((minute) => (
      <option key={`minute${minute}`} value={minute}>
        {minute}
      </option>
    ));
  };

  return (
    <form
      className="col-span-3 flex flex-col gap-2"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="h-8" />
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
          <div className="flex justify-evenly gap-4">
            <select
              className="basis-1/2 border border-1 rounded border-gray-300 p-2 bg-gray-200"
              {...register('hour', {
                onChange: (e) => {
                  const { minutes } = getValues();
                  const combinedTime = `${e.target.value || '00'}:${minutes || '00'}`;
                  setValue('time', combinedTime);
                  handleChange();
                },
              })}
            >
              {renderHourOptions()}
            </select>
            <select
              className="basis-1/2 border border-1 rounded border-gray-300 p-2 bg-gray-200"
              {...register('minutes', {
                onChange: (e) => {
                  const { hour } = getValues();
                  setValue('time', `${hour || '00'}:${e.target.value || '00'}`);
                  handleChange();
                },
              })}
            >
              {renderMinutesOptions()}
            </select>
          </div>
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
