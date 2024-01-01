import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Delivery, Tip, Tax } from 'components'

import { APPLY_DEDUCTIONS } from 'store/personList'
import { UPDATE_GRAND } from 'store/order'

const Deductions = () => {
  const dispatch = useDispatch()
  const { delivery, tip, tax } = useSelector(state => state.order)
  const persons = useSelector(state => state.personList)

  useEffect(() => {
    dispatch(UPDATE_GRAND({ personList: persons }))
  }, [persons])

  const applyDeductions = e => {
    e.preventDefault()
    const tipAmount = tip / persons.length
    const deliveryCharges = delivery / persons.length
    dispatch(APPLY_DEDUCTIONS({ tip: tipAmount, tax, delivery: deliveryCharges }))
  }

  return (
    <form className='px-3 my-3' onSubmit={applyDeductions}>
      <Tip dispatch={dispatch} />
      <Delivery dispatch={dispatch} />
      <Tax dispatch={dispatch} />
      <div className='my-2 text-end '>
        <button type='submit' className='btn btn-sm btn-success w-25 rounded-0'>Apply</button>
      </div>
    </form>
  )
}

export default Deductions
