import { TPost } from '@/types/types';

export default function DashboardTopCategories({ data }: { data: TPost[] }) {
  const topCategories = new Map();
  data.map((postObj) => {
    const { tag, views } = postObj.attributes;

    if (!topCategories.has(tag)) {
      topCategories.set(tag, { category: tag, value: views });
    } else {
      if (topCategories.size === 5) {
        const mapViews = topCategories.get(tag);
        topCategories.set(tag, {
          ...mapViews,
          value: views + mapViews.value,
        });
      }
    }
  });

  const blocksData = [...topCategories.values()];
  const classes: { [id: number]: string } = {
    0: 'col-span-5 bg-gray-800 text-white rounded-lg p-2',
    1: 'col-span-3 bg-gray-700 text-white rounded-lg p-2',
    2: 'col-span-2 bg-gray-600 text-white rounded-lg p-2',
    3: 'col-span-1 bg-gray-500 text-white rounded-lg p-2',
    4: 'col-span-1 bg-gray-400 text-white rounded-lg p-2',
  };

  return (
    <div className="grid grid-cols-5 gap-1">
      {blocksData.map((postObj, id) => {
        return (
          <div key={postObj.category} className={classes[id]}>
            {id + 1}. {postObj.category}
          </div>
        );
      })}
    </div>
  );
}
