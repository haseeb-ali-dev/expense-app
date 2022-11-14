import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PAY_AMOUNTS, SPLIT } from 'store/personList'
import { UPDATE_ABLE_TO_SAVE } from 'store/menu'
import { UPDATE_PERSONS } from 'store/order'

import 'components/PayArea/style.css'

const PayArea = () => {
  const { ableToSave } = useSelector(state => state.menu)
  const dispatch = useDispatch()
  const { id: uid } = useSelector(state => state.user)
  const order = useSelector(state => state.order)
  const persons = useSelector(state => state.personList)
  const [paidAmounts, setPaidAmounts] = useState({})
  const [remain, setRemain] = useState(order.grand)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => setRemain(order.grand), [order.grand])

  useEffect(() => {
    const users = persons.map(p => p.id)
    dispatch(UPDATE_PERSONS({ persons, users }))
  }, [paidAmounts, persons])

  const payAndSplit = e => {
    e.preventDefault()
    dispatch(PAY_AMOUNTS({ paidAmounts }))
    dispatch(UPDATE_ABLE_TO_SAVE())
    dispatch(SPLIT())
  }

  const handleBlur = e => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
    setRemain(prevRemain => prevRemain.toFixed(2) - value)
    setPaidAmounts({
      ...paidAmounts,
      [e.target.name]: value,
    })
    setDisabled((remain - value) !== 0)
  }

  const handleFocus = e => {
    setDisabled(true)
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
    if (value > remain) setRemain(remain + value)
  }

  return (
    <div className='px-3 py-2'>
      <p className='fs-4'>Pay Area</p>
      <form onSubmit={payAndSplit}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Total<small className='text-muted'> (Rs.)</small></th>
              <th scope='col'>Paid<small className='text-muted'> (Rs.)</small></th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {
              persons.map((person, idx) => (
                <tr key={`${idx.toString()}`}>
                  <td className='text-truncate person-name-cell'>{person.name}</td>
                  <td>{person.total.toLocaleString('en-US')}</td>
                  <td>
                    <input
                      className='form-control form-control-sm'
                      type='number'
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      min={0}
                      defaultValue={uid === person.id ? remain : 0}
                      name={person.name}
                      step={0.01}
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='3' className='text-end text-danger'><strong>Remaining: </strong>Rs. {remain.toLocaleString('en-US')}</td>
            </tr>
          </tfoot>
        </table>
        <div className='text-end'>
          {!ableToSave && <button type='submit' className='btn btn-success btn-sm rounded-0 px-4' disabled={disabled}>Pay and Split</button>}
        </div>
      </form>
    </div>
  )
}

export default memo(PayArea)
