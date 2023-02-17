import prisma from '@/server/db/client'
import Head from 'next/head'
import React from 'react'

export default function Dashboard({tamu}) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div>
        <h1 className='text-2xl'>Dashboard</h1>
        {tamu.map(t=>(
          <p>{t.nama}</p>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const tamu = await prisma.tamu.findMany()
  console.log(tamu)
  return {
    props: {
      tamu: JSON.parse(JSON.stringify(tamu)) 
    }
  }
}

