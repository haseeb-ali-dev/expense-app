import { useDispatch, useSelector } from 'react-redux'

import { ADD_RESTURANT } from 'store/order'

const ResturantForm = () => {
  const dispatch = useDispatch()
  const { resturant } = useSelector(state => state.order)

  return (
    <div className='mb-2'>
      <label className='form-label'>Resturant Name</label>
      <input
        type='text'
        className='form-control'
        placeholder='Enter Resturant Name'
        onBlur={e => dispatch(ADD_RESTURANT({ name: e.target.value }))}
        defaultValue={resturant}
      />
    </div>
  )
}
export default (ResturantForm)
