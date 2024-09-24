import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '/logo.svg';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'underline underline-offset-8' : undefined;

export default function Header() {
  return (
    <div className="w-full h-[64px] flex justify-center place-center bg-white/50 border-b-2 border-b-base-black-100 fixed backdrop-blur z-10">
      <div className="w-full h-full max-w-[1440px] flex items-center justify-between">
        <div className="flex-1">
          <Link to="/">
            <img src={logo} alt="logo icon" />
          </Link>
        </div>
        <nav className="flex-1 flex justify-center items-center">
          <ul className="list-none flex gap-6">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <HashLink smooth to="/#portfolio">
                Portfolio
              </HashLink>
            </li>
            <li>
              <NavLink to="/blog" className={navLinkClass}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex-1" />
      </div>
    </div>
  );
}
