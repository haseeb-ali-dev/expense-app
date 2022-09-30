import { useState } from 'react'

import Toggler from 'assets/images/toggler.png'

import 'components/Navbar/style.css'

const index = () => {
  const [responsive, setResponsive] = useState(false)
  const [navClass, iconClass] = [`topnav ${responsive && 'responsive'}`, `icon ${responsive && 'active'}`]
  return (
    <div className={navClass} id='myTopnav'>
      <a href='#home' className='active'>Expense App</a>
      <a href='#news'>Orders</a>
      <a href='#contact'>Profile</a>
      <button type='button' className={iconClass} onClick={() => setResponsive(!responsive)}>
        <img src={Toggler} alt='toggler' />
      </button>
    </div>
  )
}
export default index
