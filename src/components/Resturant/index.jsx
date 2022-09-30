import Input from 'components/Input'

import 'components/Resturant/style.css'

const Resturant = () => (
  <div className='resturant-box'>
    <span className='resturant-label'>Resturant Name</span>
    <Input type='text' name='resturant_name' required placeholder='Enter Resturant Name' />
  </div>
)

export default Resturant
