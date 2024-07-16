import hero from '/hero.png';
import spotify from '/spotify.png';
import squareLogo from '/squareLogo.png';
import payoneer from '/payoneer.png';
import sugarcrm from '/sugarcrm.png';

function App() {
  return (
    <div className="w-full min-h-screen max-w-[1640px] my-0 mx-auto flex flex-col">
      <div className="h-[64px]" />
      <div className="flex items-center justify-between mt-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-7xl">Empowering Innovative Startups</h1>
          <p className="text-xl">
            Investing in the future of technology and innovation.
          </p>
        </div>
        <img src={hero} alt="hero image" loading="lazy" />
      </div>
      <div className="w-full grid grid-cols-3 py-6 border-2 border-t-base-black-100 border-b-base-black-100 mt-6">
        <div>
          <p>OUR PORTFOLIO</p>
        </div>
        <div className="col-span-2 justify-self-stretch ">
          <div className="flex items-center justify-between">
            <img src={spotify} alt="spotify logo" loading="lazy" />
            <img src={squareLogo} alt="squareLogo logo" loading="lazy" />
            <img src={payoneer} alt="payoneer logo" loading="lazy" />
            <img src={sugarcrm} alt="sugarcrm logo" loading="lazy" />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 py-6 border-2 border-b-base-black-100">
        <div>
          <p>ABOUT US</p>
        </div>
        <div className="col-span-2 flex flex-col gap-6 border-2 border-l-base-black-100 px-6">
          <div>
            <div className="flex">
              <h2 className="text-6xl font-bold text-black">EMPOWERING</h2>
              <div className="w-12"></div>
            </div>
            <div className="flex">
              <div className="w-12"></div>
              <h2 className="text-6xl font-bold text-black">TECH STARTUPS</h2>
            </div>
            <div className="flex">
              <h2 className="text-6xl font-bold text-black">To SUCCEED</h2>
              <div className="w-12"></div>
            </div>
          </div>
          <p className="text-xl">
            We are a venture capital firm based in San Francisco committed to
            funding and supporting the most innovative startups in the
            technology sector.
          </p>
          <p className="text-xl">
            Our mission is to empower entrepreneurs to turn their ideas into
            successful businesses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
