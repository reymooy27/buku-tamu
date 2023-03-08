'use client'
import { getBaseUrl } from '@/utils/getBaseUrl'
import { Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, {useState} from 'react'
import useSWR from 'swr'

export default function Tamu({params}) {

  const sessionId = params.sessionId

  const router = useRouter()

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const {data} = useSWR(`${getBaseUrl()}/api/tamu/${sessionId}`,fetcher)
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  async function handleRating(){
    setIsLoading(true)
    await fetch(`${getBaseUrl()}/api/tamu/rating`,{
      method: 'PATCH',
      body: JSON.stringify({
        rating,
        tamuId: data?.tamuId,
        sessionId
      })
    })
    .then(async res=>{
      console.log(await res.json())
      setIsSent(true)
    })
    .catch(err=>{
      console.log(err)
      setIsLoading(false)
    })
  }

  return (
    <div className='w-full h-full flex justify-center items-center gradient-bg'>
    <div className='px-6 py-6 rounded-md flex flex-col items-center gap-4 w-[300px] mt-[-100px] _blur pb-[60px] form'>
     <h1 className='text-[28px] font-bold'>Terima Kasih</h1>
     <h1>Bagaimana pengalaman anda ?</h1>
     <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "text-yellow-400" : "text-slate-500"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star text-[48px]">&#9733;</span>
          </button>
        );
      })}
      {!isSent && <button disabled={isLoading} onClick={handleRating} type='submit' className={`${isLoading ? 'opacity-80' : 'opacity-100'} btn-grad flex items-center font-bold shadow-none mt-[10px]`}>
							{isLoading ? <div><Spinner size={'md'} /></div> : 'Submit'}</button>}
    </div>
    </div>
  </div>
  )
}
