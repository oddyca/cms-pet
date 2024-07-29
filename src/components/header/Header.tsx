import { NavLink } from 'react-router-dom';
import logo from '/logo.svg';

export default function Header() {
  return (
    <div className="w-full h-[64px] flex justify-center place-center bg-white/50 border-2 border-b-base-black-100 fixed backdrop-blur">
      <div className="w-full h-full max-w-[1440px] flex items-center justify-between">
        <div className="flex-1">
          <img src={logo} alt="logo icon" />
        </div>
        <nav className="flex-1 flex justify-center items-center">
          <ul className="list-none flex gap-6">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/#portfolio">Portfolio</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex-1" />
      </div>
    </div>
  );
}
