import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { addOrder } from 'api/order'
import { UPDATE_RECEIVERS } from 'store/order'

const splitArea = () => {
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const persons = useSelector(state => state.personList)
  const order = useSelector(state => state.order)
  const { ableToSave } = useSelector(state => state.menu)

  const [receivers, setReceivers] = useState([])

  const saveOrder = async e => {
    e.preventDefault()
    await addOrder(order).then(() => console.log('order added successfully!')).then(() => console.log(order))
    redirect('/')
  }

  useEffect(() => {
    setReceivers(() => persons.filter(person => person.payable === 0 && person.receivable !== 0))
  }, [persons])

  useEffect(() => {
    dispatch(UPDATE_RECEIVERS({ receivers }))
  }, [receivers])

  return (
    <div className='p-3'>
      <form onSubmit={saveOrder}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Total<small className='text-muted'> (PKR)</small></th>
              <th scope='col'>Paid<small className='text-muted'> (PKR)</small></th>
              <th scope='col'>Receivable<small className='text-muted'> (PKR)</small></th>
              <th scope='col'>Payable<small className='text-muted'> (PKR)</small></th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {
              persons.map((person, idx) => (
                <tr key={`${idx.toString()}`}>
                  <td>{person.name}</td>
                  <td>{person.total}</td>
                  <td>{person.paid}</td>
                  <td className='text-success'>{person.receivable}</td>
                  <td className='text-danger'>{person.payable}
                    {(person.payable !== 0 && receivers.length !== 0)
                      ? ` to ${receivers.map(r => ` ${r.name} `)}`
                      : ''}
                  </td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='6' className='text-end'><strong>Grand Total: </strong>PKR/- {order.grand}</td>
            </tr>
          </tfoot>
        </table>
        <div className='text-end'>
          <button type='submit' className='btn btn-sm btn-success rounded-pill' disabled={!ableToSave}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default splitArea
