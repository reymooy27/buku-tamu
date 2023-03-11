'use client'
import { getBaseUrl } from '@/utils/getBaseUrl'
import { Spinner} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import { utils, writeFileXLSX } from 'xlsx';
import Image from 'next/image'
import TabelTamu from '@/components/TabelTamu'
import DialogTamu from '@/components/DialogTamu'


export default function Page() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const [currentMonth, setMonth] = useState(new Date().getMonth())
  const [openDialog, setOpenDialog] = useState(false)
  const {isLoading, error, data} = useSWR(`${getBaseUrl()}/api/get-tamu-by-month/${currentMonth}`,fetcher)
  const [dialogType, setDialogType] = useState('')
  const [tamuData, setTamuData] = useState(0)

  function handleOpenDialog(data, type){
    setTamuData(data)
    setOpenDialog(true)
    setDialogType(type)
  }

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "data.xlsx");
  }, [data]);

  return (
    <div className='p-5 flex flex-col w-full h-full'>
      <div className='p-3 rounded-md w-full shadow-md bg-slate-200'>
        <div className='my-2 flex justify-between flex-col md:flex-row'>
          <h1 className='text-xl font-bold mb-2'>Daftar Tamu</h1>
          <div className='flex gap-2 justify-center'>
            <button onClick={exportFile} className='flex gap-3 bg-green-500 p-3 rounded-md'>
              <Image src='/file-text.svg' width={24} height={24} alt='icon-file'/>
              <span>Download</span>
            </button>
            <select className='w-[60px] md:w-[200px] self-end bg-white' type='date' value={currentMonth} onChange={(e)=> setMonth(e.target.value)}>
              <option value={0}>Januari</option>
              <option value={1}>Februari</option>
              <option value={2}>Maret</option>
              <option value={3}>April</option>
              <option value={4}>Mei</option>
              <option value={5}>Juni</option>
              <option value={6}>Juli</option>
              <option value={7}>Agustus</option>
              <option value={8}>September</option>
              <option value={9}>Oktober</option>
              <option value={10}>November</option>
              <option value={11}>Desember</option>
            </select>
          </div>
          
        </div>
        {isLoading && 
          <div className='w-full h-[300px] flex justify-center items-center'>
            <Spinner/>
          </div>
        }
        {!isLoading && data?.length < 1 &&
            <div className='w-full h-[300px] mt-5 flex justify-center items-center'>
              <h1>Tidak ada tamu bulan ini</h1>
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
