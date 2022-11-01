import { useDispatch } from 'react-redux'

import { ADD_DEDUCTION } from 'store/order'

const delivery = () => {
  const dispatch = useDispatch()

  return (
    <div className='mb-3 row'>
      <label className='col-sm-3 col-form-label'>Delivery</label>
      <div className='col-sm-9'>
        <input
          type='number'
          className='form-control'
          placeholder='Enter delivery charges'
          onChange={e => dispatch(ADD_DEDUCTION({ key: 'delivery', value: parseFloat(e.target.value) }))}
          defaultValue={0}
        />
      </div>
    </div>
  )
}

export default delivery
