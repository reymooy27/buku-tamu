
import { getBaseUrl } from '@/utils/getBaseUrl'
import React from 'react'


export default async function page() {

  async function getTamu(){
    const res = await fetch(`${getBaseUrl()}/api/get-tamu`)
    return res.json()
  }

  const data = await getTamu()
  console.log(data)
  return (
    <div className='bg-white flex w-full h-full'>
      <div className='w-[300px] h-full bg-slate-500'>
        sidebar
      </div>
      <div className='w-full h-full'>
        <div className='bg-blue-500 w-full h-[50px]'>
          Header
        </div>
        <div className='p-5 bg-red-500 h-full'>
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  )
}



