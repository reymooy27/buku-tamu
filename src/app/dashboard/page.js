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
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import useSWR from 'swr'
import { ResponsiveContainer, LineChart , XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'
import Link from 'next/link'

export default function Page() {

  const [currentDate, setDate] = useState(new Date().toISOString().slice(0,10))
  const [openDialog, setOpenDialog] = useState(false)
  const [userID, setUserID] = useState(0)

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const {isLoading, error, data} = useSWR(`${getBaseUrl()}/api/get-tamu-by-date/${currentDate}`,fetcher)

  const {data: allTamu} = useSWR(`${getBaseUrl()}/api/get-tamu-all-count`,fetcher)
  const {data: tamuHariIni} = useSWR(`${getBaseUrl()}/api/get-tamu-by-date-count`,fetcher)
  const {data: tamuBulanIni} = useSWR(`${getBaseUrl()}/api/get-tamu-by-month-count`,fetcher)
  const {data: tamuTahunIni} = useSWR(`${getBaseUrl()}/api/get-tamu-by-year-count`,fetcher)
  const {data: monthlyCount} = useSWR(`${getBaseUrl()}/api/get-monthly-count`,fetcher)

  function handleOpenDialog(id){
    setUserID(id)
    setOpenDialog(true)
  }

  return (
    <div className='p-5 flex flex-col w-full h-full'>
      <div className='mb-3 w-full'>
        <h1 className='text-[28px] font-bold'>{new Date().toDateString()}</h1>
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
          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Nama</Th>
                  <Th>Alamat</Th>
                  <Th>Hp</Th>
                  <Th>Jenis Kelamin</Th>
                  <Th>Instansi</Th>
                  <Th>Jam Dilayani</Th>
                  <Th>Jam Selesai Dilayani</Th>
                  <Th>Keperluan</Th>
                  <Th>Kepuasan</Th>
                  <Th>Action</Th>
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
                    <Td>{dt.jamKeluar && new Date(dt.jamKeluar).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })}</Td>
                    <Td>{dt.keperluan}</Td>
                    <Td>
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className={index <= dt?.kepuasan ? "text-yellow-400" : "text-slate-500"}
                        >
                          <span className="star text-[28px]">&#9733;</span>
                        </button>
                      );
                    })}
                    </Td>
                    <Td>
                      <button className='p-3 rounded-md bg-red-400' onClick={()=> handleOpenDialog(dt.id)}>Hapus</button>
                    </Td>
                </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>}
        </div> 

        <Dialog openDialog={openDialog} userID={userID} setOpenDialog={setOpenDialog}/>
    </div>
  )
}



export function Dialog({openDialog, setOpenDialog, userID}) {
  const cancelRef = React.useRef()
  const [isLoading, setIsLoading] = useState(false)

  async function deleteTamu(id){
    setIsLoading(true)
    await fetch(`${getBaseUrl()}/api/deleteTamu`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: userID
      })
    })
    .then(async res=> {
      setIsLoading(false)
    })
    .catch(err=> setIsLoading(false))
    setOpenDialog(false)
  }

  return (
    <div>
      <AlertDialog
        isOpen={openDialog}
        leastDestructiveRef={cancelRef}
        onClose={()=> setOpenDialog(false)}
      >
        <AlertDialogOverlay className='flex items-center'>
          <AlertDialogContent className='m-[20px] mt-[60px]'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Hapus Tamu
            </AlertDialogHeader>

            <AlertDialogBody>
              Anda yakin ingin menghapus
            </AlertDialogBody>

            <AlertDialogFooter flex gap={3}>
              <button className='bg-red-400 p-4 rounded-md hover:opacity-[0.7]' onClick={()=> deleteTamu(userID)}>
              {isLoading ? <div><Spinner size={'md'} /></div> : 'Hapus'}
              </button>
              <button className='bg-slate-400 p-4 rounded-md hover:opacity-[0.7]' ref={cancelRef} onClick={()=> setOpenDialog(false)}>
                Cancel
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}