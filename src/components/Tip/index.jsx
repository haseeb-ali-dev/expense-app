import { memo } from 'react'
import { ADD_DEDUCTION } from 'store/order'

export default memo(({ dispatch }) => (
  <div className='mb-3 row'>
    <label className='col-sm-3 col-form-label'>Tip</label>
    <div className='col-sm-9'>
      <input
        type='number'
        className='form-control'
        placeholder='Enter tip amount'
        onChange={e => dispatch(ADD_DEDUCTION({ key: 'tip', value: parseFloat(e.target.value) }))}
        defaultValue={0}
      />
    </div>
  </div>
))
