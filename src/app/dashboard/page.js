'use client'

import { getBaseUrl } from '@/utils/getBaseUrl'
import React, {Suspense, useState} from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Input
} from '@chakra-ui/react'
import useSWR from 'swr'
import { ResponsiveContainer, LineChart , XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'

const chartdata = [
  {
    "name": "Januari",
    "uv": 4000,
  },
  {
    "name": "Februari",
    "uv": 3000,
  },
  {
    "name": "Page C",
    "uv": 2000,
  },
  {
    "name": "Page D",
    "uv": 2780,
  },
  {
    "name": "Page E",
    "uv": 1890,
  },
  {
    "name": "Page F",
    "uv": 2390,
  },
  {
    "name": "Page G",
    "uv": 3490,
  }
]

export default function Page() {

  const [currentDate, setDate] = useState(new Date().toISOString().slice(0,10))

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const {isLoading, error, data} = useSWR(`${getBaseUrl()}/api/get-tamu-by-date/${currentDate}`,fetcher)

  
  const {data: allTamu} = useSWR(`${getBaseUrl()}/api/get-tamu`,fetcher)
  const {data: tamuHariIni} = useSWR(`${getBaseUrl()}/api/get-tamu-by-date/${new Date().toISOString().slice(0,10)}`,fetcher)
  const {data: tamuBulanIni} = useSWR(`${getBaseUrl()}/api/get-tamu-by-month/${new Date().getUTCMonth()}`,fetcher)

  return (
    <div className='p-5 flex flex-col'>
      <div className='mb-3'>
        <h1 className='text-[28px] font-bold'>{new Date().toDateString()}</h1>
      </div>
      <div className='flex justify-evenly flex-row mb-5 gap-4'>
        <div className='flex flex-col justify-center bg-slate-200 rounded-md shadow-md p-3 md:pl-5 h-[100px] w-full text-center md:text-left'>
          <Suspense fallback={<Spinner size={'md'}/>}>
            <h1 className='tet-[20px] md:text-[28px] font-bold'>{tamuHariIni?.length}</h1>
            <p className='text-[12px] leading-[1.2] md:text-[16px]'>Tamu hari ini</p>
          </Suspense>
        </div>
        <div className='flex flex-col justify-center bg-slate-200 rounded-md shadow-md p-3 md:pl-5 h-[100px] w-full text-center md:text-left'>
          <h1 className='tet-[20px] md:text-[28px] font-bold'>{tamuBulanIni?.length}</h1>
          <p className='text-[12px] leading-[1.2] md:text-[16px]'>Tamu bulan ini</p>
        </div>
        <div className='flex flex-col justify-center bg-slate-200 rounded-md shadow-md p-3 md:pl-5 h-[100px] w-full text-center md:text-left'>
          <h1 className='tet-[20px] md:text-[28px] font-bold'>{data?.length}</h1>
          <p className='text-[12px] leading-[1.2] md:text-[16px]'>Tamu tahun ini</p>
        </div>
        <div className='flex flex-col justify-center bg-slate-200 rounded-md shadow-md p-3 md:pl-5 h-[100px] w-full text-center md:text-left'>
          <h1 className='tet-[20px] md:text-[28px] font-bold'>{allTamu?.length}</h1>
          <p className='text-[12px] leading-[1.2] md:text-[16px]'>Total tamu</p>
        </div>
      </div>
      <div className='w-full h-[200px] p-4 pb-8 mb-5 rounded-md bg-slate-200 shadow-md'>
        <h1 className='text-xl font-bold mb-2'>Statistik</h1>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart width={500} height={200} data={chartdata}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false}/>
            <YAxis axisLine={false} tickLine={false}/>
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#3b82f6" strokeWidth={3}/>
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
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Nama</Th>
                  <Th>Alamat</Th>
                  <Th>Hp</Th>
                  <Th>Jenis Kelamin</Th>
                  <Th>Instansi</Th>
                  <Th>Jam Masuk</Th>
                  <Th>Keperluan</Th>
                  <Th>Kepuasan</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((dt, i)=>(
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{dt.nama}</Td>
                    <Td>{dt.alamat}</Td>
                    <Td>{dt.hp}</Td>
                    <Td>{dt.jenisKelamin}</Td>
                    <Td>{dt.asalInstansi}</Td>
                    <Td>{new Date(dt.jamMasuk).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })}</Td>
                    <Td>{dt.keperluan}</Td>
                    <Td>{dt.kepuasan}</Td>
                </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>}
        </div> 
    </div>
  )
}