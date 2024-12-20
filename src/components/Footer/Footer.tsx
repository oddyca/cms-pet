import { Link } from 'react-router-dom';
import HorizontallDivider from '../Dividers/HorizontalDivider';
import Logo from '@/assets/Logo';
import GitLogo from '@/assets/GitLogo';
import TelegramLogo from '@/assets/TelegramLogo';

export default function Footer() {
  return (
    <div className="w-full">
      <HorizontallDivider />
      <div className="mx-auto my-0 max-w-[1440px] min-h-[300px] flex flex-col 2xl:flex-row gap-6 2xl:justify-between items-center 2xl:items-start py-6 px-6 2xl:px-0">
        <div className="flex items-center gap-4">
          <Logo fillColor="black" />
          <p>Venture Capital</p>
        </div>
        <ul className="list-none grid grid-cols-2 2xl:flex 2xl:flex-col gap-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/#portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
        </ul>
        <Link to="/dashboard/home">Control Panel</Link>
        <div className="flex gap-4">
          <a
            href="https://github.com/oddyca"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 duration-300 ease-in-out"
          >
            <GitLogo fillColor="black" />
          </a>
          <a
            href="https://t.me/emilsin"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 duration-300 ease-in-out"
          >
            <TelegramLogo fillColor="black" />
          </a>
        </div>
        <p>2024 | oddyca</p>
      </div>
    </div>
  );
}
