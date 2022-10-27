import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { PAY_AMOUNTS } from 'store/personList'
import { UPDATE_ABLE_TO_SAVE } from 'store/menu'
import { UPDATE_PERSONS } from 'store/order'

const payArea = () => {
  const dispatch = useDispatch()
  const persons = useSelector(state => state.personList)
  const order = useSelector(state => state.order)

  const [remain, setRemain] = useState(0)
  const [paidAmounts, setPaidAmounts] = useState({})

  useEffect(() => {
    setRemain(order.grand)
  }, [order.grand])

  const payAndSplit = e => {
    e.preventDefault()
    dispatch(PAY_AMOUNTS({ paidAmounts }))
    dispatch(UPDATE_ABLE_TO_SAVE())
  }

  useEffect(() => {
    dispatch(UPDATE_PERSONS({ persons }))
  }, [paidAmounts, persons])

  const handleBlur = e => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
    setRemain(prevRemain => prevRemain.toFixed(2) - value)
    setPaidAmounts({
      ...paidAmounts,
      [e.target.name]: value,
    })
  }

  const handleFocus = e => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
    setRemain(remain + value)
  }

  return (
    <div className='p-3'>
      <form onSubmit={payAndSplit}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Total<small className='text-muted'> (PKR)</small></th>
              <th scope='col'>Paid<small className='text-muted'> (PKR)</small></th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {
              persons.map((person, idx) => (
                <tr key={`${idx.toString()}`}>
                  <td>{person.name}</td>
                  <td>{person.total}</td>
                  <td>
                    <input className='form-control form-control-sm' type='number' onBlur={handleBlur} onFocus={handleFocus} min='0' name={person.name} step={0.01} />
                  </td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='3' className='text-end'><strong>Remaining: </strong>PKR/- {remain.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <div className='text-end'>
          <button type='submit' className='btn btn-success btn-sm rounded-pill' disabled={!(remain === 0)}>Pay and Split</button>
        </div>
      </form>
    </div>
  )
}

export default payArea
