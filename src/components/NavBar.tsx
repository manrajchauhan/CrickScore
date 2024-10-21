"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();

  const LinkHighlight = (content: string, link: string, index: number) => {

    switch (pathname) {

      case "/":
        return (
          <Link href={link} className={`${pathname === link?'border-b':''}  p-2 px-3`} key={index}>
            {content}
          </Link>
        );

        case "/upcoming":
          return (
            <Link href={link} className={`${pathname === link?'border-b':''}  p-2 px-3`} key={index}>
              {content}
            </Link>
          );

      case "/recent":
        return (
          <Link href={link} className={`${pathname === link?'border-b':''} p-2 px-3`} key={index}>
            {content}
          </Link>
        );

      case "/about":
        return (
          <Link href={link} className={`${pathname === link?'border-b':''} p-2 px-3`} key={index}>
            {content}
          </Link>
        );

      default:
        return (
          <Link href={link} className={`p-2 px-3`} key={index}>
            {content}
          </Link>
        );
    }
  };

  // console.log(pathname);

  return (
    <div className={`flex justify-between ${pathname === '/sell' ? 'text-heading ' : 'text-white '} items-center px-14 mt-4`}>
      <Link href={'/'}>
        <Image priority={true} src={'/logo.png'} width={200} height={0} sizes='100vw' alt='logo' className=' ' />
      </Link>
      <ul className='flex gap-5 '>
        {NavContent.map(({ content, link }, index) => (
          LinkHighlight(content, link, index)
        ))}
      </ul>
    </div>
  );
};

export default NavBar;

const NavContent = [
  { content: "Live", link: '/' },
  { content: "Upcoming", link: '/upcoming' },
  { content: "Recent", link: '/recent' },
  { content: "About", link: '/about' },
];
