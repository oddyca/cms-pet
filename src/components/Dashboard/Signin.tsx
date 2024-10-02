import { useState } from 'react';

import Form from './Form';
import logo from '/logo.svg';
import info from '/info.svg';

const hiddenHint = 'hidden absolute left-0 p-2';
const shownHint =
  'absolute left-6 top-2 z-10 p-2 border border-gray-300 bg-white w-max max-w-[36ch] rounded';

export default function Signin() {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="w-full min-h-screen max-w-[1440px] my-0 mx-auto flex flex-col justify-center items-center">
      <div className="h-[64px]" />
      <div className="flex flex-col items-center w-1/2 h-1/2 gap-6">
        <img src={logo} alt="company logo" />
        <div className="flex items-center gap-2">
          <p className="text-md text-gray-500">Sign in to Dashboard</p>
          <div className="relative">
            <img
              src={info}
              alt="hint icon"
              className="cursor-pointer"
              onMouseEnter={() => setIsHidden(false)}
              onMouseLeave={() => setIsHidden(true)}
            />
            <div className={`${isHidden ? hiddenHint : shownHint}`}>
              {/*eslint-disable-next-line prettier/prettier*/}
              To sign in as an admin use{' '} <span className="rounded p-1 bg-zinc-200 border border-gray-300">admin@test.com</span> as login and <span className="rounded p-1 bg-zinc-200 border border-gray-300"> test123 </span> as password</div>
          </div>
        </div>
        <Form />
      </div>
    </div>
  );
}
