import React from 'react'
import img1 from '../assets/dl.beatsnoop 1.png'

export default function Profile() {
  return (
    <div className='px-28'>
      {/*  */}
      <div className='flex justify-between mt-20 mb-20'>
        <h1>Home / MyAccount</h1>
        <div>
          <h1>Welcome! <span className='text-[#e07575]'>Sandeep Singh</span></h1>
        </div>
      </div>

      {/* Profile */}
      <div className='flex justify-between items-center'>
        <div className='w-2/3 flex items-center'>
          <img src={img1} alt='not showing' className='rounded-full w-56 h-56 object-cover'/>
        </div>
        <div className=''>
          <h1 className='text-3xl'>Profile</h1>
          <div className='mt-10'>
            <h1 className='text-xl'>Name: Sandeep Singh</h1>
            <h1 className='text-xl'>Name: Sandeep Singh</h1>
            <h1 className='text-xl'>Name: Sandeep Singh</h1>
            <h1 className='text-xl'>Name: Sandeep Singh</h1>
            <h1 className='text-xl'>Name: Sandeep Singh</h1>
            <h1 className='text-xl'>Name: Sandeep Singh</h1>
          </div>
          
        </div>
      </div>
    </div>
  )
}
