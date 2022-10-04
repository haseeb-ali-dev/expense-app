import { useState } from 'react'
import { Link } from 'react-router-dom'

import Toggler from 'assets/images/toggler.png'

import 'components/Navbar/style.css'

const index = () => {
  const [responsive, setResponsive] = useState(false)
  const [navClass, iconClass] = [`topnav ${responsive && 'responsive'}`, `icon ${responsive && 'active'}`]
  return (
    <div className={navClass} id='myTopnav'>
      <Link to='/' className='active'>Expense App</Link>
      <Link to='/order'>Orders</Link>
      <Link to='/'>Create New</Link>
      <button type='button' className={iconClass} onClick={() => setResponsive(!responsive)}>
        <img src={Toggler} alt='toggler' />
      </button>
    </div>
  )
}
export default index
