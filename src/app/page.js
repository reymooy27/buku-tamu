'use client'

import { Inter } from '@next/font/google'
import Image from 'next/image'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] , variable: 'inter'})

export default function Home() {

  const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)
  const [input, setInput] = useState({
		nama: '',
		alamat: '',
		hp: '',
		jenisKelamin: 'Laki-Laki',
		keterangan: ''
  })

  async function handleSubmit(e){
		e.preventDefault()

		if(input.nama === '' && input.alamat=== ''){
			return
		}

		setLoading(true)
		setDisabled(true)
		await fetch('http://localhost:3000/api/create-tamu', {
			method: 'POST',
			body: JSON.stringify(input),
		})
		.then(res=> {
			console.log(res.json())
			setInput({
				nama: '',
				alamat: '',
				hp: '',
				jenisKelamin: '',
				keterangan: ''
			})
			setLoading(false)
			setDisabled(false)
		})
		.catch(err=> {
			console.log(err)
			setLoading(false)
			setDisabled(false)
		})
  }

	function handleChange(e) {
		setInput({...input, [e.target.name]: e.target.value})
	}	

  return (
	<div className='flex h-full relative'>
	{/* form */}
		<div className='w-[0px] sm:w-[60%] mx-0 m-auto'>
			<Image 
				className='mx-auto my-0' 
				src={'/developer-team.svg'} 
				width={600} 
				height={600} 
				alt='ilustration-developer-svg'
			/>
		</div>

		<div className='form w-full sm:w-[40%] bg-white p-5 m-3 mr-5 rounded-[10px]'>
			<h1 className='text-[28px] mb-[20px] text-center'>Selamat Datang</h1>
			<form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full'>
					<input 
						onChange={handleChange} 
						value={input.nama} 
						type="text" 
						placeholder='Nama' 
						name='nama' 
						required
					/>
					<input 
						onChange={handleChange} 
						value={input.alamat} 
						type="text" 
						placeholder='Alamat' 
						name='alamat'
						required
					/>

				<input 
					onChange={handleChange} 
					value={input.hp} 
					type="number" 
					placeholder='No.Hp' 
					name='hp' 
					min={0}
					minLength={11}
					required
				/>
				<select 
					onChange={handleChange} 
					name='jenisKelamin' 
					value={input.jenisKelamin}
				>
					<option value="Laki-Laki">Laki-Laki</option>
					<option value="Perempuan">Perempuan</option>
				</select>
				<textarea 
					onChange={handleChange} value={input.keterangan} 
					name='keterangan' 
					className='p-[10px] rounded-[10px] outline-none 
										border border-solid border-[#d6d4d4] hover:border-black 
										transition-all ease-in-out duration-300 focus:border-black' 
					placeholder='Keterangan'
				></textarea>
				<button 
					disabled={disabled} 
					className={`${disabled ? 'opacity-80' : 'opacity-100'} btn-grad`}>
						{loading ? 'Loading...' : 'Submit'}
				</button>
			</form>
		</div>


{/* popup */}
		{/* <div id='pop-up' className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center bg-[#0000006c]">
			<div className='w-[300px] h-[300px] rounded-[10px] bg-red-500'>
					<button id="close">Close</button>
			</div>
		</div> */}

	</div>
  )
}
