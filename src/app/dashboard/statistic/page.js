'use client'

import React, { useState } from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

export default function Page() {

  let currentYer = new Date().getFullYear()

  const [year, setYear] = useState(currentYer)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Daftar tamu tahun ${year}`,
      },
    },
  };

  const labels = [
    'Januari', 
    'Februari', 
    'Maret', 
    'April', 
    'Mei', 
    'Juni', 
    'Juli', 
    'Agustus', 
    'September', 
    'Oktober', 
    'November', 
    'Desember'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Jumlah Tamu',
        data: [1,2,3,4,5,7,9],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className='p-5'>
      <div className='w-full w-min-[300px]'>
        <Line
          options={options}
          data={data}
        />

        <button onClick={()=> setYear((year)=> year - 1)}>Previous Year</button>
      </div>
    </div>
  )
}
