'use client'

import React, { useState } from 'react'
import {FormLabel, Spinner} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'

export default function page() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  

  async function handleSignIn(e){
    if(username === '' && password === '') return
    setIsLoading(true)
    e.preventDefault()
    console.log(username, password)
    signIn('credentials', {username, password})
    .then((fullfiled) => {
      setPassword('')
      setIsLoading(false)
    },(err)=>{
      setError(err)
    })
    .catch(err=> setError(err))
  }

  console.log(error)
  return (
    <>
      <div className='w-full h-full flex justify-center items-center gradient-bg'>
        <form onSubmit={handleSignIn} className='px-6 py-6 rounded-md shadow-lg flex flex-col gap-4 w-[300px] mt-[-100px] _blur pb-[60px]'>
          <div className='flex justify-center'>
            <h1 className='text-[24px] fint-bold'>Sign In</h1>
          </div>
          <div>
            <FormLabel>Username</FormLabel>
            <input className='p-[10px] w-full bg-slate-200 opacity-[0.7] text-black h-[50px]' required placeholder='Username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
          </div>
          <div className='mb-[10px]'>
            <FormLabel>Password</FormLabel>
            <input className='p-[10px] w-full bg-slate-200 opacity-[0.7] text-black h-[50px]'required placeholder='Password' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <button disabled={isLoading} type='submit' className={`${isLoading ? 'opacity-80' : 'opacity-100'} btn-grad flex items-center font-bold shadow-none`}>
							{isLoading ? <Spinner size={'md'} /> : 'Submit'}</button>
        </form>
      </div>
    </>
  )
}
