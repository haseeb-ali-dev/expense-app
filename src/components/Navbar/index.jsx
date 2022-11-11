import { Link, NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from 'Database'
import { RESET_USER } from 'store/user'

import { signOutIcon } from 'assets/icons'

const Navbar = () => {
  const dispatch = useDispatch()
  const { isLogged, name, avatar } = useSelector(state => state.user)
  const redirect = useNavigate()

  const active = ({ isActive }) => (isActive ? 'active-style' : 'none')

  const signedOut = async () => {
    await signOut(auth)
      .then(() => {
        redirect('/auth')
        dispatch(RESET_USER())
      })
  }

  return isLogged && (
    <>
      <header className='d-flex justify-content-between p-2 ps-3'>
        <ul className='nav nav-pills'>
          <li className='nav-item'><NavLink to='/all' className={`nav-link ${active}`}>Expense App</NavLink></li>
          <li className='nav-item'><NavLink to='/create' className={`nav-link ${active}`}>New Expense</NavLink></li>
        </ul>
        <div className='btn-group' role='group'>
          <button className='btn btn-sm border-primary m-0'>
            <img src={avatar} alt='noimage' width={30} height={30} className='rounded-pill' />
          </button>
          <button className='btn btn-sm border-primary'>
            <Link to='/profile' className='btn btn-sm m-0 p-0'>{name}</Link>
          </button>
          <button onClick={signedOut} className='btn btn-sm btn-danger'>
            <img src={signOutIcon} alt='signout' />
          </button>
        </div>
      </header>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-1 mb-1 border-top' />
    </>
  )
}

export default Navbar
