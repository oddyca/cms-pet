import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import Logo from '@/assets/Logo';
import house from '/house.svg';
import table from '/table.svg';
import HorizontallDivider from '../Dividers/HorizontalDivider';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'bg-accent-blue-350 font-semibold px-4 py-2 rounded flex gap-3 hover:text-white'
    : 'px-4 py-2 rounded flex gap-3 hover:text-white hover:bg-accent-blue-50';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.removeItem('isLogged');
    navigate('/dashboard/signin');
  };

  return (
    <>
      <div className="w-full max-h-screen">
        <div className="h-[60px] xl:h-[64px]" />
        <div className="w-full h-[calc(100vh-56px)] xl:h-[calc(100vh-64px)] p-2 xl:p-8 mx-0 my-auto">
          <div className="flex rounded-md overflow-hidden shadow-centrif h-full">
            <div className="basis-1/6 h-full bg-accent-blue-100 flex flex-col justify-between rounded">
              <div className="flex flex-col items-stretch gap-6 items-center p-2 xl:p-4">
                <Logo fillColor="text-accent-blue-50 self-center" />
                <HorizontallDivider color="accent-blue-50" />
                <div className="flex flex-col gap-4 text-white w-0 min-w-full">
                  <NavLink to="home" className={navLinkClass}>
                    <img src={house} alt="house icon" className="h-6 w-6" />
                    Home
                  </NavLink>
                  <NavLink to="posts" className={navLinkClass}>
                    <img src={table} alt="table icon" className="h-6 w-6" />
                    Posts
                  </NavLink>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClick}
                className="px-4 py-2 rounded w-0 min-w-full bg-accent-blue-50 text-white"
              >
                Log out
              </button>
            </div>
            <div className="basis-5/6 col-start-2 flex h-full p-2 xl:p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
