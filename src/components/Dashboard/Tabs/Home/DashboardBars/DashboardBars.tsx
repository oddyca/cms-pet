import { TPost } from '@/types/types';

export default function DashboardBars({ data }: { data: TPost[] }) {
  const topAuthors = new Map();
  data.map((postObj) => {
    const { author, views } = postObj.attributes;

    if (!topAuthors.has(author)) {
      topAuthors.set(author, { name: author, value: views });
    } else {
      if (topAuthors.size === 5) {
        const mapViews = topAuthors.get(author);
        topAuthors.set(author, { ...mapViews, value: views + mapViews.value });
      }
    }
  });

  const barsData = [...topAuthors.values()];
  const maxViews = barsData[0].value;

  return (
    <div className="flex flex-col gap-4">
      {barsData.map((bar) => (
        <div
          className="relative w-full flex justify-between items-center"
          key={bar.name}
        >
          <p className="text-black z-10 ml-2">{bar.name}</p>
          <p className="text-black z-10 mr-2">{bar.value}</p>

          <div
            className="absolute rounded bg-blue-300 h-8"
            style={{
              width: `${(bar.value / maxViews) * 100}%`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
