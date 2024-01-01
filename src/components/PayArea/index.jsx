import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PayField } from 'components'
import { PAY_AMOUNTS, SPLIT } from 'store/personList'
import { UPDATE_ABLE_TO_SAVE } from 'store/menu'
import { UPDATE_PERSONS } from 'store/order'

import 'components/PayArea/style.css'

const PayArea = () => {
  const dispatch = useDispatch()
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
                    <PayField
                      remain={remain}
                      setDisabled={setDisabled}
                      setPaidAmounts={setPaidAmounts}
                      setRemain={setRemain}
                      paidAmounts={paidAmounts}
                      person={person}
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
          <button type='submit' className='btn btn-success btn-sm rounded-0 px-4' disabled={disabled}>Pay and Split</button>
        </div>
      </form>
    </div>
  )
}

export default memo(PayArea)
