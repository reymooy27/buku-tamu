'use client'

import { Inter } from '@next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

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
	<div className='flex flex-col h-full relative'>
	{/* form */}
		<div className='form w-full bg-white rounded-[10px] mt-[100px] mx-auto p-7'>
			<form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full'>
				<div className="flex gap-3">
					<input 
						onChange={handleChange} 
						value={input.nama} 
						type="text" 
						placeholder='Nama' 
						name='nama' 
					/>
					<input 
						onChange={handleChange} 
						value={input.alamat} 
						type="text" 
						placeholder='Alamat' 
						name='alamat'
					/>
				</div>

				<input 
					onChange={handleChange} 
					value={input.hp} 
					type="number" 
					placeholder='No.Hp' 
					name='hp' 
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
					className='p-[10px] rounded-[10px] outline-none border border-solid border-[#d6d4d4] hover:border-black transition-all ease-in-out duration-300 focus:border-black' 
					placeholder='Keterangan'
				></textarea>
				<button 
					disabled={disabled} 
					className={`submit h-[50px] rounded-[10px] p-[10px] 
					outline-none border ${disabled ? 'opacity-80' : 'opacity-100'} hover:opacity-80 bg-[#000000e5] 
					text-white font-bold transition-all ease-in-out duration-300`}>
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
