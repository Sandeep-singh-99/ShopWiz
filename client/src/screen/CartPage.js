import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function CartPage() {
  const { isAuthenticated } = useSelector(state => state.auth)
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      message.error('Please login to view your cart')
      navigate('/')
    }
  })
  return (
    <div className='border-2 rounded-md px-20 py-10 shadow-2xl mx-20 my-10'>
      <div>
        <h1 className='text-4xl font-semibold'>Shopping Cart</h1>
      </div>
    </div>
  )
}
