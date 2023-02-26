'use client'

import { getBaseUrl } from '@/utils/getBaseUrl'
import React, {useState} from 'react'
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
import useSWRMutation from 'swr/mutation'


export default function Page() {

  const [currentDate, setDate] = useState(new Date().toISOString().slice(0,10))

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const {isLoading, error, data} = useSWR(`${getBaseUrl()}/api/get-tamu-by-date/${currentDate}`,fetcher)

  return (
    <div className='p-5'>
      <Input type='date' value={currentDate} onChange={(e)=> setDate(e.target.value)}/> 
      {isLoading && 
        <div className='w-full h-[400px] flex justify-center items-center'>
          <Spinner/>
        </div>
      }
      {!isLoading && !data ?
        <div className='w-full h-full mt-5 flex justify-center items-center'>
          <h1>No data</h1>
        </div>
      :
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama</Th>
              <Th>Alamat</Th>
              <Th>Hp</Th>
              <Th>Jenis Kelamin</Th>
              <Th>Jam Masuk</Th>
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
                <Td>{new Date(dt.jamMasuk).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })}</Td>
                <Td>{dt.kepuasan}</Td>
            </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      }
    </div>
  )
}