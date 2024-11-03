import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='shadow-2xl'> 
      <div className='px-32 flex justify-between items-center py-8'>
        <Link className=' text-3xl font-bold' to={'/'}>ShopWiz</Link>

        <div className='flex items-center gap-10'>
        <i class="ri-shopping-cart-2-line text-3xl"></i>
        <Link className=' border text-white font-semibold px-2 py-1 rounded-md bg-[#db4444]'>Login</Link>
        </div>
      </div>
    </div>
  )
}
