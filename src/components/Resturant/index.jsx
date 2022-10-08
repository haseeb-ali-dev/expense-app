import { UPDATE_RESTURANT } from 'store/resturant'
import { useSelector, useDispatch } from 'react-redux'

import Input from 'components/Input'

import 'components/Resturant/style.css'

const Resturant = () => {
  const dispatch = useDispatch()
  const resturant = useSelector(state => state.resturant)

  const handleChange = (e) => dispatch(UPDATE_RESTURANT({ name: e.target.value }))

  return (
    <div className='resturant-box'>
      <span className='resturant-label'>Resturant Name</span>
      <Input type='text' name='resturant_name' required placeholder='Enter Resturant Name' value={resturant} onChange={handleChange} />
    </div>
  )
}

export default Resturant
