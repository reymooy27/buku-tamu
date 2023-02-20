
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
    <div>
     Dashboard
    </div>
  )
}



