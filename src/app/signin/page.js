'use client'

import React, { useState } from 'react'
import {FormLabel, Spinner} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  

  async function handleSignIn(e){
    if(username === '' && password === '') return
    setIsLoading(true)
    e.preventDefault()
    
    const data = await signIn('credentials', {username, password, redirect: false, callbackUrl: '/dashboard'})

    if(data.error){
      setError(data.error)
      setIsLoading(false)
      setPassword('')
    }
   
    if(data.ok){
      router.push(data?.url)
    }
  }

  return (
    <>
      <div className='w-full h-full flex justify-center items-center gradient-bg'>
        <form onSubmit={handleSignIn} className='px-6 py-6 rounded-md flex flex-col gap-4 w-[300px] mt-[-100px] _blur pb-[60px] form'>
          <div className='flex flex-col items-center'>
            <h1 className='text-[24px] font-bold'>Sign In</h1>
            {error && <p className='text-red-600'>{error}</p>}
          </div>
          <div>
            <div>
              <FormLabel>Username</FormLabel>
            </div>
            <input className='p-[10px] w-full bg-slate-200 opacity-[0.7] text-black h-[50px]' required placeholder='Username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
          </div>
          <div className='mb-[10px]'>
            <div>
              <FormLabel>Password</FormLabel>
            </div>
            <input className='p-[10px] w-full bg-slate-200 opacity-[0.7] text-black h-[50px]'required placeholder='Password' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <div className='flex justify-center my-2'>
            <Link href='/signup' className='text-[12px] underline'>Sign Up</Link>
          </div>
          <button disabled={isLoading} type='submit' className={`${isLoading ? 'opacity-80' : 'opacity-100'} btn-grad flex items-center font-bold shadow-none`}>
							{isLoading ? <div><Spinner size={'md'} /></div> : 'Submit'}</button>
        </form>
      </div>
    </>
  )
}
