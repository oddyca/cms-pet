import React from 'react';
import logo from '/logo.svg';

export default function Header() {
  return (
    <div className='w-full h-[48px] flex items-center justify-between'>
      <div className='flex-1'>
        <img src={logo} alt="logo icon"/>
      </div>
      <nav className='flex-1 flex justify-center items-center'>
        <ul className='list-none flex gap-6'>
          <li>Home</li>
          <li>Portfolio</li>
          <li>Blog</li>
          <li>Contact Us</li>
        </ul>
      </nav>
      <div className='flex-1'/>
    </div>
  )
}
