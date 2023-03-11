'use client'

import { getBaseUrl } from '@/utils/getBaseUrl'
import React, {Suspense, useState} from 'react'
import {
  Spinner,
  Input,
} from '@chakra-ui/react'
import useSWR from 'swr'
import { ResponsiveContainer, LineChart , XAxis, YAxis, Tooltip, Line} from 'recharts'
import Link from 'next/link'
import TabelTamu from '@/components/TabelTamu'
import DialogTamu from '@/components/DialogTamu'


export default function Page() {

  const [currentDate, setDate] = useState(new Date().toISOString().slice(0,10))
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('')
  const [tamuData, setTamuData] = useState(0)

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const {isLoading, error, data} = useSWR(`${getBaseUrl()}/api/get-tamu-by-date/${currentDate}`,fetcher)

  const {data: allTamu} = useSWR(`${getBaseUrl()}/api/get-tamu-all-count`,fetcher)
  const {data: tamuHariIni} = useSWR(`${getBaseUrl()}/api/get-tamu-by-date-count`,fetcher)
  const {data: tamuBulanIni} = useSWR(`${getBaseUrl()}/api/get-tamu-by-month-count`,fetcher)
  const {data: tamuTahunIni} = useSWR(`${getBaseUrl()}/api/get-tamu-by-year-count`,fetcher)
  const {data: monthlyCount} = useSWR(`${getBaseUrl()}/api/get-monthly-count`,fetcher)

  function handleOpenDialog(data, type){
    setTamuData(data)
    setOpenDialog(true)
    setDialogType(type)
  }

  return (
    <div className='p-5 flex flex-col w-full h-full'>
      <div className='mb-3 w-full'>
        <h1 className='text-[28px] font-bold'>{new Date().toLocaleDateString('id',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h1>
      </div>
      <div className='w-full flex justify-evenly flex-row mb-5 gap-4'>
        <div className='flex flex-col justify-center bg-slate-200 rounded-md shadow-md p-3 md:pl-5 h-[100px] w-full text-center md:text-left'>
          <Suspense fallback={<Spinner size={'md'}/>}>
            <h1 className='tet-[20px] md:text-[28px] font-bold'>{tamuHariIni}</h1>
            <p className='text-[12px] leading-[1.2] md:text-[16px]'>Tamu hari ini</p>
          </Suspense>
        </div>
        <Link href='/dashboard/tamu/by-month' className='flex flex-col justify-center bg-slate-200 rounded-md shadow-md p-3 md:pl-5 h-[100px] w-full text-center md:text-left'>
          <h1 className='tet-[20px] md:text-[28px] font-bold'>{tamuBulanIni}</h1>
          <p className='text-[12px] leading-[1.2] md:text-[16px]'>Tamu bulan ini</p>
        </Link>
        <Link href='/dashboard/tamu/by-year' className='flex flex-col justify-center bg-slate-200 rounded-md shadow-md p-3 md:pl-5 h-[100px] w-full text-center md:text-left'>
          <h1 className='tet-[20px] md:text-[28px] font-bold'>{tamuTahunIni}</h1>
          <p className='text-[12px] leading-[1.2] md:text-[16px]'>Tamu tahun ini</p>
        </Link>
        <Link href='/dashboard/tamu/all' className='flex flex-col justify-center bg-slate-200 rounded-md shadow-md p-3 md:pl-5 h-[100px] w-full text-center md:text-left'>        
          <h1 className='tet-[20px] md:text-[28px] font-bold'>{allTamu}</h1>
          <p className='text-[12px] leading-[1.2] md:text-[16px]'>Total tamu</p>
        </Link>

      </div>
      <div className='w-full h-[200px] p-4 pb-8 mb-5 rounded-md bg-slate-200 shadow-md'>
        <h1 className='text-xl font-bold mb-2'>Statistik</h1>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart width={500} height={200} data={monthlyCount}
            margin={{ top: 5, right: -5, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false}/>
            <YAxis axisLine={false} tickLine={false}/>
            <Tooltip />
            <Line type="monotone" dataKey="tamu" stroke="#3b82f6" strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      
        <div className='p-3 rounded-md w-full shadow-md bg-slate-200'>
          <div className='my-2 flex justify-between flex-col md:flex-row'>
            <h1 className='text-xl font-bold mb-2'>Daftar Tamu</h1>
            <Input className='w-full md:w-[200px] self-end bg-white' type='date' value={currentDate} onChange={(e)=> setDate(e.target.value)}/>
          </div>
          {isLoading && 
            <div className='w-full h-[300px] flex justify-center items-center'>
              <Spinner/>
            </div>
          }
          {!isLoading && data?.length < 1 &&
              <div className='w-full h-[300px] mt-5 flex justify-center items-center'>
                <h1>Tidak ada tamu hari ini</h1>
              </div>
          }
          {!isLoading && data?.length > 0 && 
            <TabelTamu data={data} handleOpenDialog={handleOpenDialog}/>
          }
        </div> 

        <DialogTamu openDialog={openDialog} dialogType={dialogType} tamuData={tamuData} setOpenDialog={setOpenDialog}/>
    </div>
  )
}

