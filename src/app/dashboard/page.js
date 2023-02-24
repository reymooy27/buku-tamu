'use client'

import { getBaseUrl } from '@/utils/getBaseUrl'
import React, {use} from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

async function getTamu(){
  const res = await fetch(`${getBaseUrl()}/api/get-tamu`)
  return res.json()
}

export default function page() {

  const data = use(getTamu())

  return (
    <div className='p-5'>
      <h1 className='font-bold text-xl'>{new Date().toLocaleDateString()}</h1>
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
            {data.map((dt, i)=>(
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
    </div>
  )
}



