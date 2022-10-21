import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'

import { auth } from 'Database'

const navbar = () => {
  const redirect = useNavigate()
  const signedOut = () => {
    signOut(auth)
    redirect('/auth')
  }

  return (
    <>
      <header className='d-flex justify-content-start p-2 ps-3'>
        <ul className='nav nav-pills'>
          <li className='nav-item'><Link to='/' className='nav-link active'>Expense App</Link></li>
          <li className='nav-item'><Link to='/' className='nav-link'>All Orders</Link></li>
          <li className='nav-item'><Link to='/create' className='nav-link'>New Order</Link></li>
          <li className='nav-item'><button type='button' onClick={signedOut} className='nav-link'>Signout</button></li>
        </ul>
      </header>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-1 mb-1 border-top' />
    </>
  )
}

export default navbar
