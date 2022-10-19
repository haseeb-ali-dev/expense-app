import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_DEDUCTION, UPDATE_GRAND } from 'store/order'
import { APPLY_DEDUCTIONS } from 'store/personList'

const deductions = () => {
  const dispatch = useDispatch()
  const { tip, tax, delivery } = useSelector(state => state.order)
  const persons = useSelector(state => state.personList)
  const [disabled, useDisbaled] = useState(false)

  const addTip = (e) => dispatch(ADD_DEDUCTION({ key: 'tip', value: parseFloat(e.target.value) }))

  const addDelivery = (e) => dispatch(ADD_DEDUCTION({ key: 'delivery', value: parseFloat(e.target.value) }))

  const addTax = (e) => dispatch(ADD_DEDUCTION({ key: 'tax', value: parseFloat(e.target.value) }))

  const applyDeductions = () => {
    const tipAmount = tip / persons.length
    const deliveryCharges = delivery / persons.length
    dispatch(APPLY_DEDUCTIONS({ tip: tipAmount, tax, delivery: deliveryCharges }))
    useDisbaled(!disabled)
  }

  useEffect(() => {
    dispatch(UPDATE_GRAND({ personList: persons }))
  }, [persons])

  return (
    <div className='p-3'>
      <div className='mb-3'>
        <p className='fs-4'>Deductions</p>
      </div>
      <div className='mb-3 row'>
        <label className='col-sm-3 col-form-label'>Tip</label>
        <div className='col-sm-9'>
          <input type='number' className='form-control' placeholder='Enter tip amount' onChange={addTip} />
        </div>
      </div>
      <div className='mb-3 row'>
        <label className='col-sm-3 col-form-label'>Delivery</label>
        <div className='col-sm-9'>
          <input type='number' className='form-control' placeholder='Enter delivery charges' onChange={addDelivery} />
        </div>
      </div>
      <div className='mb-3 row'>
        <label className='col-sm-3 col-form-label'>Tax (%) </label>
        <div className='col-sm-9 m-auto '>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='radio' name='tax' value='0' onChange={addTax} />
            <label className='form-check-label'>0 %</label>
          </div>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='radio' name='tax' value='5' onChange={addTax} />
            <label className='form-check-label'>5 %</label>
          </div>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='radio' name='tax' value='16' onChange={addTax} />
            <label className='form-check-label'>16 %</label>
          </div>
        </div>
      </div>
      <div className='mb-3 text-end'>
        <button type='button' className='btn btn-sm btn-success rounded-pill' onClick={applyDeductions} disabled={disabled}>Apply</button>
      </div>
    </div>
  )
}

export default deductions
