'use client'

import Link from 'next/link'
import React from 'react'

export default function layout({children}) {
  return (
    <div className='bg-white flex w-full h-full'>
      <div className='w-0 md:w-[300px] h-full bg-slate-500 flex flex-col gap-3 items-center'>
        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/dashboard/statistic'>Statistic</Link>
      </div>
      <div className='w-full h-full'>
        <div className='bg-blue-500 w-full h-[50px]'>
          Header
        </div>
        {children}
        </div>
    </div>
  )
}
