import { useDispatch, useSelector } from 'react-redux'

import { UPDATE_RESTURANT } from 'store/order'

const resturantForm = () => {
  const dispatch = useDispatch()
  const { resturant } = useSelector(state => state.order)
  const addResturant = (e) => {
    const name = e.target.value
    dispatch(UPDATE_RESTURANT({ name: name.length === 0 ? 'Auto Generated Resturant1' : name }))
  }
  return (
    <div className='mb-2'>
      <label className='form-label'>Resturant</label>
      <input type='text' className='form-control' placeholder='Enter Resturant Name' onChange={addResturant} value={resturant} />
    </div>
  )
}

export default resturantForm
