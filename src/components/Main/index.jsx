import Navbar from 'components/Navbar2'
import Order from 'containers/order2'
import OrdersList from 'containers/ordersList'
import Payment from 'containers/payment'
import Auth from 'containers/auth'
import { auth } from 'Database'
import { onAuthStateChanged } from 'firebase/auth'
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom'
import { useState } from 'react'

const main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user
      console.log(uid)
      setIsLoggedIn(true)
    }
  })
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={isLoggedIn ? <OrdersList /> : <Navigate to='/auth' />} />
        <Route path='/create' element={<Order />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Router>
  )
}
export default main
