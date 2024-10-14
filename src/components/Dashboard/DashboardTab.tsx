import { useParams } from 'react-router-dom';
import Home from './Tabs/Home/Home';
import Posts from './Tabs/Posts/Posts';

export default function DashboardTab() {
  const { tab } = useParams();

  if (tab === 'home') return <Home />;
  if (tab === 'posts') return <Posts />;
  return <div>{tab}</div>;
}
