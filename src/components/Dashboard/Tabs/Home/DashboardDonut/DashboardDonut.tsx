import { TPost } from '@/types/types';
import { DonutChart } from '@tremor/react';

export default function DashboardDonut({ data }: { data: TPost[] }) {
  const colorScheme = localStorage.getItem('dashboardCardColors');
  const storedColors =
    colorScheme && JSON.parse(localStorage.getItem('dashboardCardColors')!);

  const donutColors: string[] = [];
  const lengedCategories: string[] = [];

  for (let color in storedColors) {
    donutColors.push(storedColors[color]['primaryColor']);
  }

  const chartData = data.map((postObj, id) => {
    lengedCategories.push(postObj.attributes.title);

    if (postObj.attributes.views > 0 && id < 5)
      return {
        title: postObj.attributes.title,
        value: postObj.attributes.views,
      };
  });

  return (
    <div className="min-h-0 h-full">
      <div className="flex flex-col gap-2 min-h-0 h-full">
        <DonutChart
          data={chartData}
          variant="donut"
          colors={donutColors}
          index="title"
          showAnimation
          showTooltip={false}
          className="w-64 h-64"
        />
        <div className="flex flex-col gap-2 min-h-0 h-full overflow-y-auto custom-scrollbar-hidden hover:custom-scrollbar">
          {lengedCategories.map((legend, id) => (
            <div key={legend} className="flex gap-2 items-center">
              <div
                className="rounded-full w-2 h-2"
                style={{ backgroundColor: donutColors[id] }}
              />
              <p className="w-1/2">{legend}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
