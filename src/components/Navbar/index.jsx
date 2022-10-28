import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from 'Database'
import { RESET_USER } from 'store/user'

const navbar = () => {
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const { isLogged } = useSelector(state => state.user)

  const signedOut = async () => {
    await signOut(auth)
      .then(() => {
        redirect('/auth')
        dispatch(RESET_USER())
      })
  }

  return (
    <>
      <header className='d-flex justify-content-start p-2 ps-3'>
        <ul className='nav nav-pills'>
          <li className='nav-item'><Link to='/' className='nav-link active'>Expense App</Link></li>
          <li className='nav-item'><Link to='/' className='nav-link'>All Orders</Link></li>
          <li className='nav-item'><Link to='/create' className='nav-link'>New Order</Link></li>
          <li className='nav-item'>
            {isLogged
              ? <button type='button' onClick={signedOut} className='nav-link'>Signout</button>
              : <Link to='/auth' className='nav-link'>Login</Link>}
          </li>
        </ul>
      </header>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-1 mb-1 border-top' />
    </>
  )
}

export default navbar
