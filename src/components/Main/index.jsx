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

const Main = () => {
  const dispatch = useDispatch()
  const personList = useSelector(state => state.personList)
  const { isLogged } = useSelector(state => state.user)
  const [haveAccount, setHaveAccount] = useState(true)
  const [authenticated, setAuthenticated] = useState(isLogged)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(SET_GLOBAL_USER({ name: user.displayName }))
      }
      setAuthenticated(true)
    })
  }, [])

  return authenticated ? (
    <Router>
      <Navbar haveAccount={haveAccount} setHaveAccount={setHaveAccount} />
      <Routes>
        <Route path='/' element={isLogged ? <OrdersList /> : <Navigate to='/auth' />} />
        <Route path='/create' element={isLogged ? <Order /> : <Navigate to='/auth' />} />
        <Route
          path='/payment'
          element={isLogged
            ? (personList.length > 0 ? <Payment /> : <Navigate to='/create' />)
            : <Navigate to='/auth' />}
        />
        <Route path='/auth' element={<Auth haveAccount={haveAccount} setHaveAccount={setHaveAccount} />} />
      </Routes>
    </Router>
  ) : <Loader />
}

export default Main
