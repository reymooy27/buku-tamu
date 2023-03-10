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
import { ResponsiveContainer, LineChart , XAxis, YAxis, Tooltip, Line} from 'recharts'
import Link from 'next/link'

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

        <Dialog openDialog={openDialog} dialogType={dialogType} tamuData={tamuData} setOpenDialog={setOpenDialog}/>
    </div>
  )
}

export function Dialog({openDialog, setOpenDialog, tamuData, dialogType}) {
  const cancelRef = React.useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState({
		nama: tamuData?.nama,
		alamat: tamuData?.alamat,
		hp: tamuData?.hp,
		jenisKelamin: tamuData?.jenisKelamin,
		asalInstansi: tamuData?.asalInstansi,
		orangYgDitemui: tamuData?.orangYgDitemui,
		keperluan: tamuData?.keperluan,
    status: tamuData?.status,
    keterangan: tamuData?.keterangan
  })
  console.log(tamuData)
  console.log(input)

  function handleChange(e) {
		setInput({...input, [e.target.name]: e.target.value})
	}	

  async function deleteTamu(){
    setIsLoading(true)
    await fetch(`${getBaseUrl()}/api/deleteTamu`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: tamuData?.id
      })
    })
    .then(async res=> {
      setIsLoading(false)
    })
    .catch(err=> setIsLoading(false))
    setOpenDialog(false)
  }
  
  async function editTamu(){
    setIsLoading(true)
    await fetch(`${getBaseUrl()}/api/tamu/edit`, {
      method: 'PATCH',
      body: JSON.stringify({
        id:tamuData?.id,
        input: input
      })
    })
    .then(async res=> {
      setIsLoading(false)
    })
    .catch(err=> setIsLoading(false))
    setOpenDialog(false)
  }

  const EditTamu = (
    <AlertDialogContent className='m-[20px] mt-[60px]'>
      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
        Edit Tamu
      </AlertDialogHeader>

      <AlertDialogBody>
        <div className='flex flex-col gap-3 w-full'>
          <label>Nama</label>
          <input className='p-[10px] w-full' 
            onChange={handleChange} 
            value={input?.nama} 
            type="text" 
            placeholder='Nama' 
            name='nama' 
            required
          />
          <label>Alamat</label>
          <input className='p-[10px] w-full'
            onChange={handleChange} 
            value={input?.alamat} 
            type="text" 
            placeholder='Alamat' 
            name='alamat'
            required
          />
          <label>No. Hp</label>
          <input className='p-[10px] w-full'
            onChange={handleChange} 
            value={input?.hp} 
            type="number" 
            placeholder='No.Hp' 
            name='hp' 
            min={0}
            minLength={11}
            required
          />
          <label>Jenis Kelamin</label>
          <select className='p-[10px] w-full'
            onChange={handleChange} 
            name='jenisKelamin' 
            value={input?.jenisKelamin}
          >
            <option value="">Jenis Kelamin</option>
            <option value="Laki-Laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <label>Asal Instansi</label>
          <input className='p-[10px] w-full'
            onChange={handleChange} 
            value={input?.asalInstansi} 
            type="text" 
            placeholder='Kantor/Instansi' 
            name='asalInstansi' 
            required
          />
          <label>Orang Yang Ditemui</label>
          <input className='p-[10px] w-full'
            onChange={handleChange} 
            value={input?.orangYgDitemui} 
            type="text" 
            placeholder='Orang Yang Ditemui' 
            name='orangYgDitemui' 
          />
          <label>Keperluan</label>
          <textarea 
						onChange={handleChange} value={input?.keperluan} 
						name='keperluan' 
						className='p-[10px] w-full rounded-[10px] outline-none opacity-[0.7]
											border border-solid border-[#d6d4d4] hover:border-black 
											transition-all ease-in-out duration-300 focus:border-black' 
						placeholder='Keperluan'
					></textarea>
          <label>Status</label>
          <select className='p-[10px] w-full'
            onChange={handleChange} 
            name='status' 
            value={input?.status}
          >
            <option value="Pending">Pending</option>
            <option value="Dilayani">Dilayani</option>
            <option value="Selesai Dilayani">Selesai Dilayani</option>
          </select>
          <label>Keterangan</label>
          <textarea 
						onChange={handleChange} value={input?.keterangan} 
						name='keterangan' 
						className='p-[10px] w-full rounded-[10px] outline-none opacity-[0.7]
											border border-solid border-[#d6d4d4] hover:border-black 
											transition-all ease-in-out duration-300 focus:border-black' 
						placeholder='Keterangan'
					></textarea>
        </div>
      </AlertDialogBody>

      <AlertDialogFooter flex gap={3}>
        <button className='bg-orange-400 p-4 rounded-md hover:opacity-[0.7]' onClick={()=> editTamu()}>
        {isLoading ? <div><Spinner size={'md'} /></div> : 'Edit'}
        </button>
        <button className='bg-slate-400 p-4 rounded-md hover:opacity-[0.7]' ref={cancelRef} onClick={()=> setOpenDialog(false)}>
          Cancel
        </button>
      </AlertDialogFooter>
    </AlertDialogContent>
)

  return (
    <div>
      <AlertDialog
        isOpen={openDialog}
        leastDestructiveRef={cancelRef}
        onClose={()=> setOpenDialog(false)}
      >
        <AlertDialogOverlay className='flex items-center'>
          {dialogType === 'delete' ? <AlertDialogContent className='m-[20px] mt-[60px]'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Hapus Tamu
            </AlertDialogHeader>

            <AlertDialogBody>
              Anda yakin ingin menghapus
            </AlertDialogBody>

            <AlertDialogFooter flex gap={3}>
              <button className='bg-red-400 p-4 rounded-md hover:opacity-[0.7]' onClick={()=> deleteTamu()}>
              {isLoading ? <div><Spinner size={'md'} /></div> : 'Hapus'}
              </button>
              <button className='bg-slate-400 p-4 rounded-md hover:opacity-[0.7]' ref={cancelRef} onClick={()=> setOpenDialog(false)}>
                Cancel
              </button>
            </AlertDialogFooter>
          </AlertDialogContent> : EditTamu}
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}

export function TabelTamu({data, handleOpenDialog}) {
  return (
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
            <Th>Keperluan</Th>
            <Th>Orang Yang Ditemui</Th>
            <Th>Jam Dilayani</Th>
            <Th>Jam Selesai Dilayani</Th>
            <Th>Status</Th>
            <Th>Keterangan</Th>
            <Th>Kepuasan</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((dt, i)=>(
            <Tr key={i}>
              <Td>{i + 1}</Td>
              <Td>{dt?.nama}</Td>
              <Td>{dt?.alamat}</Td>
              <Td>{dt?.hp}</Td>
              <Td>{dt?.jenisKelamin}</Td>
              <Td>{dt?.asalInstansi}</Td>
              <Td>{dt?.keperluan}</Td>
              <Td>{dt?.orangYgDitemui}</Td>
              <Td>{new Date(dt?.jamMasuk).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })}</Td>
              <Td>{dt?.jamKeluar && new Date(dt?.jamKeluar).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })}</Td>
              <Td>
                {dt.status === 'Dilayani' && <span className='p-3 rounded-[50px] bg-orange-300'>Dilayani</span>}
                {dt.status === 'Selesai Dilayani' && <span className='p-3 rounded-[50px] bg-green-300'>Selesai Dilayani</span>}
                {dt.status === 'Pending' && <span className='p-3 rounded-[50px] bg-red-300'>Pending</span>}
              </Td>
              <Td>{dt?.keterangan}</Td>
              <Td>
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <span
                    key={index}
                    className={index <= dt?.kepuasan ? "text-yellow-400" : "text-slate-500"}
                  >
                    <span className="star text-[28px]">&#9733;</span>
                  </span>
                );
              })}
              </Td>
              <Td className='flex gap-3'>
                <button className='p-3 rounded-md bg-orange-400 hover:opacity-[0.7]' onClick={()=> handleOpenDialog(dt, 'edit')}>Edit</button>
                <button className='p-3 rounded-md bg-red-400 hover:opacity-[0.7]' onClick={()=> handleOpenDialog(dt, 'delete')}>Hapus</button>
              </Td>
          </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
