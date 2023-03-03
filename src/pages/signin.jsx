'use client'

import React, { useState } from 'react'
import {Input} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
export default function Signin() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [isLoading, setIsLoading] = useState(false)
  

  async function handleSignIn(e){
    if(username === '' && password === '') return
    setIsLoading(true)
    e.preventDefault()
    console.log(username, password)
    signIn('credentials', {username, password})
    .then(fullfiled => {
      setPassword('')
      setIsLoading(false)
    })
  }
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div>
        <form onSubmit={handleSignIn}>
          <Input placeholder='Username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
          <Input placeholder='Password' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <button disabled={isLoading} type='submit'>{isLoading ? 'Loading...' : 'Sign In'}</button>
        </form>
      </div>
    </>
  )
}
