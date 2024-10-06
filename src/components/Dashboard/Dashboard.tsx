import { useEffect, useState } from 'react';

import Logo from '../../assets/Logo';

export default function Dashboard() {
  const [token, setToken] = useState('');
  useEffect(() => {
    const isLoggedLS = sessionStorage.getItem('isLogged');
    const JWT = localStorage.getItem('JWT') as string;

    setToken(JWT);
  }, []);
  return (
    <>
      <div className="w-full h-screen max-w-[1440px] my-0 mx-auto flex flex-col justify-center items-center">
        <div className="h-[64px]" />
        <div className="w-11/12 h-full p-8">
          <div className="grid grid-col-5 h-full rounded overflow-hidden">
            <div className="col-span-1 bg-accent-blue-100 flex flex-col items-center p-4">
              <Logo fillColor="accent-blue-50" />
            </div>
            <div className="col-span-4 col-start-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}
