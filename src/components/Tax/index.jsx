import { memo } from 'react'
import { ADD_DEDUCTION } from 'store/order'

export default memo(({ dispatch }) => (
  <div className='mb-3 row'>
    <label className='col-sm-3 col-form-label'>Tax (%) </label>
    <div className='col-sm-9 m-auto '>
      {[0, 5, 16].map(value => (
        <div className='form-check form-check-inline' key={value}>
          <input
            className='form-check-input'
            type='radio'
            name='tax'
            value={value}
            onChange={e => dispatch(ADD_DEDUCTION({ key: 'delivery', value: parseFloat(e.target.value) }))}
            defaultChecked={value === 0}
          />
          <label className='form-check-label'>{value} %</label>
        </div>
      ))}
    </div>
  </div>
))
