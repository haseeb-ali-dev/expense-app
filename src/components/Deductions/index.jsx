import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Delivery, Tip, Tax } from 'components'

import { APPLY_DEDUCTIONS } from 'store/personList'
import { UPDATE_GRAND } from 'store/order'

const deductions = () => {
  const dispatch = useDispatch()
  const { delivery, tip, tax } = useSelector(state => state.order)
  const [disabled, useDisbaled] = useState(false)
  const persons = useSelector(state => state.personList)

  useEffect(() => {
    dispatch(UPDATE_GRAND({ personList: persons }))
  }, [persons])

  const applyDeductions = () => {
    const tipAmount = tip / persons.length
    const deliveryCharges = delivery / persons.length
    dispatch(APPLY_DEDUCTIONS({ tip: tipAmount, tax, delivery: deliveryCharges }))
    useDisbaled(!disabled)
  }

  return (
    <div className='px-3'>
      <div className='my-3'>
        <p className='fs-4'>Deductions</p>
      </div>
      <Tip dispatch={dispatch} />
      <Delivery dispatch={dispatch} />
      <Tax dispatch={dispatch} />
      <div className='mb-1 text-end'>
        <button className='btn btn-sm btn-success rounded-pill' onClick={applyDeductions} disabled={disabled}>Apply</button>
      </div>
    </div>
  )
}

export default deductions
