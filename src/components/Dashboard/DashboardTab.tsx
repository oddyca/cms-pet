import { useParams } from 'react-router-dom';

export default function DashboardTab() {
  const { tab } = useParams();

  return <div>{tab}</div>;
}
