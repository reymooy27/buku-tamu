'use client'

import Dialog from '@/components/Dialog'
import { getBaseUrl } from '@/utils/getBaseUrl'
import { Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {

	const router = useRouter()

  const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)
  const [input, setInput] = useState({
		nama: '',
		alamat: '',
		hp: '',
		jenisKelamin: '',
		instansi: '',
    orangYgDitemui: '',
		keperluan: ''
  })

  async function handleSubmit(e){
		e.preventDefault()

		if(input.nama === '' && input.alamat=== ''){
			return
		}

		setLoading(true)
		setDisabled(true)
		await fetch(`${getBaseUrl()}/api/create-tamu`, {
			method: 'POST',
			body: JSON.stringify(input),
		})
		.then(async res=> {
			if(!res.ok){
				setLoading(false)
				setDisabled(false)
				setErrorMessage('Error')
			}
			const json = await res.json()
			router.push(`/tamu/${json.session.id}`)
		})
		.catch(err=> {
			console.log(err)
			setErrorMessage(JSON.stringify(err))
			setLoading(false)
			setDisabled(false)
		})
  }

	function handleChange(e) {
		setInput({...input, [e.target.name]: e.target.value})
	}	

  function preventNumber(e){
    const input = e.target
    const value = input.value
    const newValue = value.replace(/[0-9]/g, '')
    input.value = newValue
  }

  return (
	<div className='flex flex-col lg:flex-row overflow-auto h-full gradient-bg'>
	{/* form */}
		<div className='w-full lg:w-[60%] lg:mx-0 lg:m-auto mt-[20px]'>
			<Image 
				className='mx-auto my-0 w-[80px] lg:w-[300px]' 
				src={'/logo-kota-kupang.png'} 
				width={300} 
				height={300} 
				alt='ilustration-developer-svg'
			/>
			<Image 
				className='mx-auto my-0 w-[200px] lg:w-[300px]' 
				src={'/logo-diskominfo.png'} 
				width={300} 
				height={300} 
				alt='ilustration-developer-svg'
			/>
		</div>

		<div className='flex justify-center items-center w-full lg:w-[40%] p-3 lg:pr-[40px]'>
			<div className='form w-full max-w-[500px] flex flex-col items-center p-5 rounded-[10px] bg-[#ffffff80] backdrop-blur-[6px]'>
				<h1 className='text-[28px] mb-[20px] text-center'>Selamat Datang</h1>
				<form onSubmit={handleSubmit} className='flex flex-col gap-3 w-[95%]'>
					{errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}
						<input className='p-[10px]' 
							onChange={handleChange} 
              onInput={preventNumber}
							value={input.nama} 
							type="text" 
							placeholder='Nama' 
							name='nama' 
							required
						/>
						<input className='p-[10px]'
							onChange={handleChange} 
							value={input.alamat} 
							type="text" 
							placeholder='Alamat' 
							name='alamat'
							required
						/>

					<input className='p-[10px]'
						onChange={handleChange} 
						value={input.hp} 
						type="number" 
						placeholder='No.Hp' 
						name='hp' 
						min={0}
						minLength={11}
						required
					/>
					<select className='p-[10px]'
						onChange={handleChange} 
						name='jenisKelamin' 
						value={input.jenisKelamin}
					>
						<option value="">Jenis Kelamin</option>
						<option value="Laki-Laki">Laki-Laki</option>
						<option value="Perempuan">Perempuan</option>
					</select>
					<input className='p-[10px]'
						onChange={handleChange} 
						value={input.instansi} 
						type="text" 
						placeholder='Kantor/Instansi' 
						name='instansi' 
					/>
					<input className='p-[10px]'
						onChange={handleChange} 
            onInput={preventNumber}
						value={input.orangYgDitemui} 
						type="text" 
						placeholder='Orang Yang Ditemui' 
						name='orangYgDitemui' 
					/>
					<textarea 
						onChange={handleChange} value={input.keperluan} 
						name='keperluan' 
						className='p-[10px] rounded-[10px] outline-none opacity-[0.7]
											border border-solid border-[#d6d4d4] hover:border-black 
											transition-all ease-in-out duration-300 focus:border-black' 
						placeholder='Keperluan'
					></textarea>
					<button 
						disabled={disabled} 
						className={`${disabled ? 'opacity-80' : 'opacity-100'} btn-grad flex items-center font-bold`}>
							{loading ? <Spinner size={'md'} /> : 'Submit'}
					</button>
				</form>
			</div>
		</div>


		<Dialog openDialog={openDialog} setOpenDialog={setOpenDialog}/>
	</div>
  )
}
