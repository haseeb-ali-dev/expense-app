/* eslint-disable no-nested-ternary */
import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import {
  Auth, Order, OrdersList, Payment,
} from 'containers'
import { Loader, Navbar } from 'components'

import { auth } from 'Database'
import { SET_GLOBAL_USER } from 'store/user'

const main = () => {
  const dispatch = useDispatch()
  const [authChecked, setAuthChecked] = useState(false)
  const personList = useSelector(state => state.personList)
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!auth.currentUser)
  const [haveAccount, setHaveAccount] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
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
            <Navbar haveAccount={haveAccount} setHaveAccount={setHaveAccount} />
            <Routes>
              <Route path='/' element={isLoggedIn ? <OrdersList /> : <Navigate to='/auth' />} />
              <Route path='/create' element={isLoggedIn ? <Order /> : <Navigate to='/auth' />} />
              <Route
                path='/payment'
                element={isLoggedIn
                  ? (personList.length > 0 ? <Payment /> : <Navigate to='/create' />)
                  : <Navigate to='/auth' />}
              />
              <Route path='/auth' element={<Auth haveAccount={haveAccount} setHaveAccount={setHaveAccount} />} />
            </Routes>
          </>
        )
        : <Loader />}
    </Router>
  )
}

export default main
