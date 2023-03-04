'use client'

import { Avatar, Spinner } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function layout({children}) {
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
  

 

  return (
    <div className='bg-white flex w-full h-full relative'>
      <div className={`absolute md:fixed ${open ? 'left-0' : 'left-[-1000px]'} md:left-0 w-[200px] h-full bg-slate-200 flex flex-col gap-3 items-center pt-4 transition-all ease-in-out duration-300 z-10`}>
        <Link className='hover:bg-blue-500 transition-all ease-in-out duration-300 rounded-md p-3' href='/dashboard'>Dashboard</Link>
        <div className='flex justify-end'>
          {session && <button onClick={()=> signOut({callbackUrl: '/signin'})}>Sign Out</button>}
        </div>
      </div>
      <div className='w-full h-full md:ml-[200px] bg-[#e7e4e426]'>
        <div className='bg-blue-500 w-full h-[50px] flex flex-col justify-center items-center'>
          <div className='flex self-end pr-3'>
            {session ? <Avatar onClick={()=> setOpen(open=> !open)} name={session?.user?.username} size='sm' src='https://bit.ly/broken-link' /> : <Link href='/signin'>Sign In</Link>}
          </div>
        </div>
        {children}
        </div>
    </div>
  )
}
