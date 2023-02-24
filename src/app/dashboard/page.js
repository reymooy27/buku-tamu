'use client'

import { getBaseUrl } from '@/utils/getBaseUrl'
import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
} from '@chakra-ui/react'
import useSWR from 'swr'


export default function Page() {

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const {isLoading, error, data} = useSWR(`${getBaseUrl()}/api/get-tamu`, fetcher)

  return (
    <div className='p-5'>
      <h1 className='font-bold text-xl'>{new Date().toLocaleDateString()}</h1>
      {isLoading && <Spinner/>}
      {data !== undefined &&
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