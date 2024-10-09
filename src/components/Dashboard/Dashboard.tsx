import { useEffect, useState } from 'react';

import Logo from '@/assets/Logo';
import house from '/house.svg';
import table from '/table.svg';
import HorizontallDivider from '../Dividers/HorizontalDivider';
import { NavLink, Outlet } from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'bg-accent-blue-350 font-semibold max-w-full px-4 py-2 rounded flex gap-3 hover:text-white'
    : 'max-w-full px-4 py-2 rounded flex gap-3 hover:text-white hover:bg-accent-blue-50';

export default function Dashboard() {
  const [token, setToken] = useState('');
  useEffect(() => {
    const isLoggedLS = sessionStorage.getItem('isLogged');
    const JWT = sessionStorage.getItem('JWT') as string;

    setToken(JWT);
  }, []);
  return (
    <>
      <div className="w-full h-screen max-w-[1440px] my-0 mx-auto flex flex-col justify-center items-center">
        <div className="h-[64px]" />
        <div className="w-11/12 h-full p-8">
          <div className="grid grid-col-5 h-full rounded overflow-hidden">
            <div className="col-span-1 bg-accent-blue-100 flex flex-col items-stretch gap-6 items-center p-4">
              <Logo fillColor="text-accent-blue-50 self-center" />
              <HorizontallDivider color="accent-blue-50" />
              <div className="flex flex-col gap-4 text-white w-0 min-w-full">
                <NavLink to="main" className={navLinkClass}>
                  <img src={house} alt="house icon" className="h-6 w-6" />
                  Dashboard
                </NavLink>
                <NavLink to="posts" className={navLinkClass}>
                  <img src={table} alt="table icon" className="h-6 w-6" />
                  Posts
                </NavLink>
              </div>
            </div>
            <div className="col-span-4 col-start-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
