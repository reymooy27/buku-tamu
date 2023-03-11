import React, { useEffect, useState } from "react"
import {
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { getBaseUrl } from "@/utils/getBaseUrl"

export default function DialogTamu({openDialog, setOpenDialog, tamuData, dialogType}) {
  const cancelRef = React.useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState({
		nama: '',
		alamat: '',
		hp: '',
		jenisKelamin: '',
		asalInstansi: '',
		orangYgDitemui: '',
		keperluan: '',
    status: '',
    keterangan: ''
  })

  useEffect(() => {
    setInput({
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
  }, [tamuData])
  

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
