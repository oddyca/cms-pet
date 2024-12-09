import { useEffect, useState } from 'react';
import { getStatsForDashboard } from '@/services/fetchServices';
import { sortDashboardData } from '@/utils/sortDashboardData';
import { TPost } from '@/types/types';

import DashboardCard from './DashboardCard/DashboardCard';

export default function Home() {
  const [dashboardData, setDashboardData] = useState<TPost[]>([]);
  useEffect(() => {
    let dataToRender = null;
    const fetchData = async () => {
      const response = await getStatsForDashboard();
      dataToRender = sortDashboardData(response.data);
      setDashboardData(dataToRender);
    };
    fetchData();
    console.log('dashBoardData', dashboardData);
  }, []);

  return (
    <div className="basis-1/3">
      <h2 className="font-bold text-xl mb-4">Dashboard | Overview</h2>
      <div className="flex flex-wrap gap-2">
        {dashboardData &&
          dashboardData.map(
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
  );
}
