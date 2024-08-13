import VerticalDivider from '../Dividers/VerticalDivider';
import HorizontallDivider from '../Dividers/HorizontalDivider';

import logo from '/logo.svg';
import NavBar from './NavBar/NavBar';

export default function Blog() {
  return (
    <>
      <div className="h-[64px]" />
      <div className="w-full h-fit bg-sky-500/100 flex justify-center py-8">
        <div className="w-full max-w-[1440px]">
          <p className="text-3xl text-black">
            VENTURE <img className="inline" src={logo} /> CAPITAL
          </p>
        </div>
        {/* <img src={bg} /> */}
      </div>
      <div className="w-full min-h-screen max-w-[1440px] my-8 mx-auto flex flex-col gap-8">
        <NavBar />
        <div className="grid grid-cols-3">
          <div className="col-span-2"></div>
          <div className="col-span-1 flex flex-col gap-2">
            <p className="text-gray-400">SEE ALSO</p>
            <div className="flex flex-col"></div>
          </div>
        </div>
      </div>
    </>
  );
}
