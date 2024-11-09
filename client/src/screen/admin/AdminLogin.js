import React from 'react'

export default function AdminLogin() {
  return (
    <div className='bg-gradient-to-r from-blue-600 to-purple-600 flex justify-center items-center h-screen'>
        <div className='shadow-lg bg-white rounded-lg px-10 py-5'>
            <h1 className='text-4xl font-bold'>Admin Login</h1>
            <div className='bg-gradient-to-r from-blue-700 to-purple-600 w-full h-1 '></div>
            <form className='mt-5 flex flex-col'>
                <label className='font-semibold'>User Id:</label>
                <input type='text' className='border-2 border-gray-400 rounded-md p-1 mb-3 outline-none'/>
                <label className='font-semibold'>Password:</label>
                <input type='password' className='border-2 border-gray-400 rounded-md p-1 mb-3 outline-none'/>

                <button className='bg-[#ee7276] text-white py-1 rounded-md'>Login</button>
            </form>
        </div>
    </div>
  )
}
