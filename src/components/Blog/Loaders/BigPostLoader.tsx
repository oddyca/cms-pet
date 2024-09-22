import HorizontallDivider from '../../Dividers/HorizontalDivider';

export default function BigPostLoader() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-4">
        <div className="flex-1 rounded bg-gray-300" />
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="w-full h-6 rounded-full bg-gray-300" />
            <div className="flex flex-col gap-2">
              <div className="w-full h-4 rounded-full bg-gray-300" />
              <div className="w-full h-4 rounded-full bg-gray-300" />
            </div>
            <div className="w-10 h-4 rounded-full bg-gray-300" />
          </div>
          <div className="flex place-self-end w-10 h-4 rounded-full bg-gray-300" />
        </div>
      </div>
      <HorizontallDivider />
    </div>
  );
}
