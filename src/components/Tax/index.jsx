import { useDispatch } from 'react-redux'

import { ADD_DEDUCTION } from 'store/order'

const tax = () => {
  const dispatch = useDispatch()
  const taxes = [0, 5, 16]

  return (
    <div className='mb-3 row'>
      <label className='col-sm-3 col-form-label'>Tax (%) </label>
      <div className='col-sm-9 m-auto '>
        {taxes.map(value => (
          <div className='form-check form-check-inline'>
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
  )
}

export default tax
