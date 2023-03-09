'use client'
import { getBaseUrl } from '@/utils/getBaseUrl'
import { 
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import { Dialog } from '../../page'
import { utils, writeFileXLSX } from 'xlsx';
import Image from 'next/image'


export default function Page() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const [currentMonth, setMonth] = useState(new Date().getMonth())
  const [openDialog, setOpenDialog] = useState(false)
  const {isLoading, error, data} = useSWR(`${getBaseUrl()}/api/get-tamu-by-month/${currentMonth}`,fetcher)
  const [userID, setUserID] = useState(0)

  function handleOpenDialog(id){
    setUserID(id)
    setOpenDialog(true)
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
            <select className='md:w-[200px] self-end bg-white' type='date' value={currentMonth} onChange={(e)=> setMonth(e.target.value)}>
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
                <Th>Tanggal</Th>
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
                  <Td>{new Date(dt.jamMasuk).toLocaleDateString()}</Td>
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
                  
        <Dialog openDialog={openDialog} userID={userID} setOpenDialog={setOpenDialog}/>

      </div> 
    </div>
  )
}
