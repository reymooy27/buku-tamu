'use client'

import React, { useState } from 'react'
import {FormLabel, Spinner} from '@chakra-ui/react'
import { getBaseUrl } from '@/utils/getBaseUrl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  

  async function handleSignUp(e){
    if(username === '' && password === '') return
    setIsLoading(true)
    e.preventDefault()
    await fetch(`${getBaseUrl()}/api/create-user`,{
      method: 'POST',
      body: JSON.stringify({username, password})
    })
    .then(res=>{
      setIsLoading(false)
      setPassword('')
      router.push('/signin')
    })
    .catch(err=>{
      console.log(err)
      setError(err)
      setIsLoading(false)
      setPassword('')
    })
  }

  return (
    <>
      <div className='w-full h-full flex justify-center items-center gradient-bg'>
        <form onSubmit={handleSignUp} className='px-6 py-6 rounded-md flex flex-col gap-4 w-[300px] mt-[-100px] _blur pb-[60px] form'>
          <div className='flex justify-center'>
            <h1 className='text-[24px] font-bold'>Sign Up</h1>
          </div>
          <div>
            <FormLabel>Username</FormLabel>
            <input className='p-[10px] w-full bg-slate-200 opacity-[0.7] text-black h-[50px]' required placeholder='Username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
          </div>
          <div className='mb-[10px]'>
            <FormLabel>Password</FormLabel>
            <input className='p-[10px] w-full bg-slate-200 opacity-[0.7] text-black h-[50px]'required placeholder='Password' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <div className='flex justify-center my-2'>
            <Link href='/signin' className='text-[12px] underline'>Sign In</Link>
          </div>
          <button disabled={isLoading} type='submit' className={`${isLoading ? 'opacity-80' : 'opacity-100'} btn-grad flex items-center font-bold shadow-none`}>
							{isLoading ? <Spinner size={'md'} /> : 'Submit'}</button>
        </form>
      </div>
    </>
  )
}
