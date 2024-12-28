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
    <div>cart</div>
  )
}
