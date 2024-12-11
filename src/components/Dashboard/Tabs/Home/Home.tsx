import { TAllPosts, TPost } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { getStatsForDashboard } from '@/services/fetchServices';
import { sortDashboardData } from '@/utils/sortDashboardData';

import DashboardCard from './DashboardCard/DashboardCard';
import DashboardCategory from './DashboardCategory/DashboardCategory';
import DashboardDonut from './DashboardDonut/DashboardDonut';
import DashboardBars from './DashboardBars/DashboardBars';
import DashboardTopCategories from './DashboardTopCategories/DashboardTopCategories';

export default function Home() {
  const { isPending, data } = useQuery<TAllPosts>({
    queryKey: ['dashboardData'],
    queryFn: getStatsForDashboard,
  });

  if (isPending) return null;

  const sortedData: TPost[] = sortDashboardData(data!.data!);

  return (
    <div className="flex flex-col h-full w-full gap-4">
      <h2 className="font-bold text-xl w-full h-fit">Dashboard | Overview</h2>
      {!isPending && (
        <div className="flex flex-row flex-grow gap-4 h-full min-h-0">
          <div className="basis-1/3 flex flex-col gap-2 min-h-0 h-full">
            <DashboardCategory name="Most popular posts" />
            <div className="grid grid-cols-1 xl:grid-cols-2 auto-rows-min gap-2 place-items-stretch h-full min-h-0 overflow-y-auto custom-scrollbar-hidden hover:custom-scrollbar">
              {sortedData.map(
                (postObj, id) =>
                  postObj.attributes.views > 0 &&
                  id < 5 && (
                    <DashboardCard
                      key={postObj.attributes.title}
                      postData={postObj.attributes}
                      id={id}
                    />
                  ),
              )}
            </div>
          </div>
          <div className="basis-1/4 flex flex-col gap-2 min-h-0 h-full">
            <DashboardCategory name="Total views" />
            <DashboardDonut data={sortedData} />
          </div>
          <div className="basis-1/4  flex flex-col gap-4">
            <DashboardCategory name="Top authors" />
            <DashboardBars data={sortedData} />
          </div>
          <div className="basis-1/4  flex flex-col gap-4">
            <DashboardCategory name="Top categories" />
            <DashboardTopCategories data={sortedData} />
          </div>
        </div>
      )}
    </div>
  );
}
