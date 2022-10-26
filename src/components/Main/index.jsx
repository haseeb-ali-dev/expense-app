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
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = auth.currentUser
    return !!user
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => (user ? setIsLoggedIn(!isLoggedIn) : null))
  }, [])

  return (
    <Router>
      <Navbar haveUser={isLoggedIn} />
      <Routes>
        <Route path='/' element={<OrdersList />} />
        <Route path='/create' element={isLoggedIn ? <Order /> : <Navigate to='/auth' />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Router>
  )
}
export default main
