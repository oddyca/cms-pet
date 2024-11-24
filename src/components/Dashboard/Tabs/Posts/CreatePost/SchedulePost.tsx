import React from 'react';

export default function SchedulePost() {
  return (
    <div className="col-span-3 flex flex-col gap-2 w-full">
      <p className="self-end">Schedule the post</p>
      <div className="flex flex-col gap-4 border border-1 border-gray-300 shadow-centrif rounded p-4">
        <div className="w-full flex flex-col gap-2">
          <p>Date</p>
          <input
            type="date"
            className="border border-1 rounded border-gray-300 p-2 bg-gray-200"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p>Time</p>
          <input
            type="time"
            className="border border-1 rounded border-gray-300 p-2 bg-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
