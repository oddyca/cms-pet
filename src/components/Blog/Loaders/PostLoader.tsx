export default function PostLoader() {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="rounded bg-gray-300 h-64 w-1/2 animate-pulse" />
      <div className="flex flex-col w-1/2 animate-pulse">
        <div className="flex flex-col gap-4">
          <div className="w-full h-6 rounded-full bg-gray-300" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-1/2 h-4 rounded-full bg-gray-300" />
            <div className="w-1/2 h-4 rounded-full bg-gray-300" />
          </div>
          <div className="place-self-end w-10 h-4 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
