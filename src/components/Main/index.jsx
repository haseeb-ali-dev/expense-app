import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { auth } from 'Database'

import Auth from 'containers/auth'
import Navbar from 'components/Navbar'
import Order from 'containers/order'
import OrdersList from 'containers/ordersList'
import Payment from 'containers/payment'

const main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user
        setIsLoggedIn(true)
        setCurrentUser(uid)
      }
    })
  }, [])

  return (
    <Router>
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route path='/' element={isLoggedIn ? <OrdersList /> : <Navigate to='/auth' />} />
        <Route path='/create' element={<Order />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/auth' element={isLoggedIn ? <Navigate to='/' /> : <Auth />} />
      </Routes>
    </Router>
  )
}
export default main
