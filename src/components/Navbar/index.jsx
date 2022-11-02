import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from 'Database'
import { RESET_USER } from 'store/user'

import { signOutIcon } from 'assets/icons'

const navbar = ({ haveAccount, setHaveAccount }) => {
  const dispatch = useDispatch()
  const { isLogged, name } = useSelector(state => state.user)
  const redirect = useNavigate()

  const signedOut = async () => {
    await signOut(auth)
      .then(() => {
        redirect('/auth')
        dispatch(RESET_USER())
      })
  }

  return (
    <>
      <header className='d-flex justify-content-between p-2 ps-3'>
        <ul className='nav nav-pills'>
          <li className='nav-item'><Link to='/' className='nav-link active'>Expense App</Link></li>
          <li className='nav-item'><Link to='/' className='nav-link'>All Orders</Link></li>
          <li className='nav-item'><Link to='/create' className='nav-link'>New Order</Link></li>
        </ul>
        {isLogged
          ? (
            <div className='btn-group' role='group'>
              <button className='btn btn-sm btn-outline-primary'><div className='mx-1'>{name}</div></button>
              <button onClick={signedOut} className='btn btn-sm btn-danger'>
                <img src={signOutIcon} alt='signout' />
              </button>
            </div>
          )
          : (
            <button className='btn btn-outline-primary rounded-pill' onClick={() => setHaveAccount(!haveAccount)}>
              {haveAccount ? 'Sign Up' : 'Login'}
            </button>
          )}
      </header>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-1 mb-1 border-top' />
    </>
  )
}

export default navbar
