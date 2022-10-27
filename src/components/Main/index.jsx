/* eslint-disable no-nested-ternary */
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { auth } from 'Database'
import { SET_GLOBAL_USER } from 'store/user'

import Auth from 'containers/auth'
import Loader from 'components/Loader'
import Navbar from 'components/Navbar'
import Order from 'containers/order'
import OrdersList from 'containers/ordersList'
import Payment from 'containers/payment'

const main = () => {
  const dispatch = useDispatch()
  const personList = useSelector(state => state.personList)
  const [authChecked, setAuthChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = auth.currentUser
    return !!user
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(!isLoggedIn)
        dispatch(SET_GLOBAL_USER({ name: user.displayName }))
      }
      setAuthChecked(true)
    })
  }, [])

  return (
    <Router>
      {authChecked
        ? (
          <>
            <Navbar />
            <Routes>
              <Route path='/' element={isLoggedIn ? <OrdersList /> : <Navigate to='/auth' />} />
              <Route path='/create' element={isLoggedIn ? <Order /> : <Navigate to='/auth' />} />
              <Route
                path='/payment'
                element={isLoggedIn
                  ? (personList.length > 0 ? <Payment /> : <Navigate to='/create' />)
                  : <Navigate to='/auth' />}
              />
              <Route path='/auth' element={<Auth />} />
            </Routes>
          </>
        )
        : <Loader />}
    </Router>
  )
}

export default main
