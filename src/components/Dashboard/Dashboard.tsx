import React, { useEffect, useState } from 'react';

import Logo from '@/assets/Logo';
import house from '/house.svg';
import table from '/table.svg';
import HorizontallDivider from '../Dividers/HorizontalDivider';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'bg-accent-blue-350 font-semibold px-4 py-2 rounded flex gap-3 hover:text-white'
    : 'px-4 py-2 rounded flex gap-3 hover:text-white hover:bg-accent-blue-50';

export default function Dashboard() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.removeItem('isLogged');
    navigate('/dashboard/signin');
  };

  useEffect(() => {
    const isLoggedLS = sessionStorage.getItem('isLogged');
    const JWT = sessionStorage.getItem('JWT') as string;

    setToken(JWT);
  }, []);
  return (
    <>
      <div className="w-full max-h-screen">
        <div className="h-[64px]" />
        <div className="w-full h-[calc(100vh-64px)] p-8 mx-0 my-auto">
          <div className="flex rounded shadow-centrif h-full">
            <div className="basis-1/5 align-self-stretch bg-accent-blue-100 flex flex-col justify-between">
              <div className="flex flex-col items-stretch gap-6 items-center p-4">
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
              <div>
                <button
                  type="button"
                  onClick={handleClick}
                  className="px-4 py-2 rounded w-0 min-w-full bg-accent-blue-50 text-white"
                >
                  Log out
                </button>
              </div>
            </div>
            <div className="basis-4/5 col-start-2 flex p-2 h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
