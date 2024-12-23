import { TPost } from '@/types/types';

export const sortDashboardData = (data: TPost[]): TPost[] => {
  const sortedData = [...data];
  sortedData.sort((a, b) => b.attributes.views - a.attributes.views);

  return sortedData;
};
