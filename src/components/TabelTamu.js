import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

export default function TabelTamu({data, handleOpenDialog}) {
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
