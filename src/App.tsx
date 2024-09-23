import { Link } from 'react-router-dom';

import VerticalDivider from './components/Dividers/VerticalDivider';
import HorizontallDivider from './components/Dividers/HorizontalDivider';
import WeOfferCell from './components/WeOffer/WeOffer';
import FeaturedCompanies from './components/FeaturedCompanies/FeaturedCompanies';

import hero from '/hero.png';
import spotify from '/spotify.png';
import squareLogo from '/squareLogo.png';
import payoneer from '/payoneer.png';
import sugarcrm from '/sugarcrm.png';
import triangle from '/triangle.svg';
import laptop from '/laptop.png';
import drone from '/drone.png';
import fundingIcon from '/fundingIcon.svg';
import mentorshipIcon from '/mentorshipIcon.svg';
import networkingIcon from '/networkingIcon.svg';
import resourcesIcon from '/resourcesIcon.svg';
import portfolioBanner from '/portfolioBanner.png';

const aboutSloganClass = 'text-7xl font-bold text-black';

function App() {
  return (
    <>
      <div className="w-full min-h-screen max-w-[1440px] my-0 mx-auto flex flex-col">
        <div className="h-[64px]" />
        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col gap-6">
            <h1 className="text-7xl text-black">
              Empowering Innovative Startups
            </h1>
            <p className="text-xl">
              Investing in the future of technology and innovation.
            </p>
          </div>
          <img src={hero} alt="hero image" loading="lazy" />
        </div>
        <div className="mt-6">
          <HorizontallDivider />
          <div className="w-full grid grid-cols-3 py-6">
            <div className="flex flex-col justify-between">
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
          <HorizontallDivider />
        </div>
        <div className="w-full grid grid-cols-3 py-6">
          <div className="flex justify-between">
            <p>ABOUT US</p>
            <VerticalDivider />
          </div>
          <div className="col-span-2 flex flex-col gap-6 px-6">
            <div>
              <div className="flex items-center gap-4">
                <h2 className={`${aboutSloganClass} ml-10`}>EMPOWERING</h2>
                <div>
                  <img
                    src={triangle}
                    alt="triangle icon"
                    className="h-[5rem] w-[5rem]"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <img src={laptop} alt="laptop image" className="h-[5rem]" />
                </div>
                <h2 className={aboutSloganClass}>TECH STARTUPS</h2>
              </div>
              <div className="flex gap-4">
                <h2 className={`${aboutSloganClass} ml-10`}>TO SUCCEED</h2>
                <div>
                  <img src={drone} alt="drone image" className="h-[5rem]" />
                </div>
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
      <Link to="/blog">
        <div className="w-full bg-accent-purple-100 hover:bg-gradient-to-r from-accent-purple-100 via-accent-purple-50 to-accent-purple-100 animated-background py-1 flex justify-center items-center">
          <p className="font-semibold text-xs text-black">
            CHECK OUT THE BLOG FOR OUR INSIGHTS AND IDEAS &#10141;
          </p>
        </div>
      </Link>
      <div className="w-full min-h-screen max-w-[1440px] mx-auto flex flex-col">
        <div>
          <div>
            <div className="w-full grid grid-cols-3 py-6">
              <div className="flex justify-between">
                <p>WHAT WE OFFER</p>
                <VerticalDivider />
              </div>
              <div className="col-span-2 flex flex-col gap-6 pl-6">
                <div className="flex justify-evenly items-center">
                  <WeOfferCell
                    img={fundingIcon}
                    alt="funding icon"
                    title="FUNDING"
                    paragraph="Capital investment to fuel your growth"
                  />
                  <VerticalDivider />
                  <WeOfferCell
                    img={mentorshipIcon}
                    alt="mentorship icon"
                    title="MENTORSHIP"
                    paragraph="Guidance from experienced industry leaders."
                  />
                </div>
                <HorizontallDivider />
                <div className="flex justify-evenly items-center">
                  <WeOfferCell
                    img={networkingIcon}
                    alt="networking icon"
                    title="NETWORKING"
                    paragraph="Access to our extensive network of business contacts."
                  />
                  <VerticalDivider />
                  <WeOfferCell
                    img={resourcesIcon}
                    alt="resources icon"
                    title="RESOURCES"
                    paragraph="Comprehensive resources to help your business thrive."
                  />
                </div>
              </div>
            </div>
            <HorizontallDivider />
          </div>
          <div id="portfolio">
            <div className="w-full grid grid-cols-3 py-6">
              <div className="flex justify-between">
                <p>OUR PORTFOLIO</p>
                <VerticalDivider />
              </div>
              <div className="col-span-2 flex flex-col gap-10 pl-6">
                <img src={portfolioBanner} alt="portfolio image" />
                <h3 className="text-xl">
                  We proudly support a diverse array of pioneering tech
                  companies that are shaping the future of innovation. Each
                  company is chosen for its potential to create meaningful
                  change and lead its market.
                </h3>
                <div className="flex flex-col gap-8 w-full items-center">
                  <FeaturedCompanies
                    img={spotify}
                    alt="spotify logo"
                    paragraph="A cutting-edge company revolutionizing the music industry."
                  />
                  <FeaturedCompanies
                    img={squareLogo}
                    alt="square logo"
                    paragraph="Leading the way in sustainable energy technologies."
                  />
                  <FeaturedCompanies
                    img={payoneer}
                    alt="payoneer logo"
                    paragraph="Innovating the future of personal finance through technology."
                  />
                  <FeaturedCompanies
                    img={sugarcrm}
                    alt="sugarcrm logo"
                    paragraph="An award-winning CRM that helps business create customers for life."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
