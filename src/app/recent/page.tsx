import NavBar from '@/components/NavBar'
import RecentMatch from '@/components/Recent'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <>
    <div className='relative h-[40vh] flex flex-col justify-between'>
      <NavBar />
      <div className="bg-black/40 h-full w-full absolute top-0 left-0 -z-10"></div>
      <Image
      src={'/std1.jpg'}
      alt='Upcoming'
      width={1512}
      height={928}
      className='w-full h-full object-cover opacity-85 absolute top-0 -z-20 '/>
      <h1 className='text-6xl text-white tracking-tighter px-16 mb-20 font-medium'>Recent Matches</h1>
    </div>
    <div className='px-14'>
    <RecentMatch/>
    </div>
    </>
  )
}
