'use client'

import { Avatar,  Spinner } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Layout({children}) {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const {status, data: session} = useSession()

  if(status === 'loading'){
    return(
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner size='xl'/>
      </div>
    )
  }

    if(status === 'unauthenticated'){
      return router.push('/signin')
    }

    async function handleSignOut(){
      const data = await signOut({callbackUrl: '/signin', redirect: false})
      router.push(data.url)
    }
  
  return (
    <div className='bg-white flex w-full h-full relative'>
      <div className={`absolute md:fixed ${open ? 'left-0' : 'left-[-1000px]'} overflow-x-hidden md:left-0 w-[200px] h-full bg-slate-200 flex flex-col justify-between py-[30px] items-center transition-all ease-in-out duration-300 z-10`}>
        <div className='flex flex-col justify-center items-center'>
          <div className='mb-[10px]'>
          {session ? 
            <Avatar name={session?.user?.username} size='lg' src='https://bit.ly/broken-link' /> : <Avatar/>}
          </div>
          <div className='flex p-[20px] w-full'>
            <Image src='/dashboard.svg' width={24} height={24} alt='icon-dashboard'/>
            <Link className='pl-[20px]' href='/dashboard'>Dashboard</Link>
          </div>
        </div>
        {session && <div className='flex justify-center p-[20px] w-full'>
          <Image src='/log-out.svg' width={24} height={24} alt='icon-log-out'/>
          <button className='pl-[20px]' onClick={handleSignOut}>Log Out</button>
        </div>}
      </div>
      <div className='w-full h-full md:ml-[200px] bg-[#e7e4e426]'>
        <div className='bg-blue-500 w-full h-[50px] flex flex-col justify-center items-center'>
          <div className='flex self-end pr-3 md:hidden'>
            <Image src='/menu.svg' width={24} height={24} alt='icon-log-out' onClick={()=> setOpen((open)=> !open)}/>
          </div>
        </div>
        {children}
        </div>
    </div>
  )
}
