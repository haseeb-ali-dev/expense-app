/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { addOrder } from 'api/order'
import { RESET_ORDER } from 'store/order'
import { RESET_PERSON_LIST } from 'store/personList'
import { UPDATE_ABLE_TO_SAVE } from 'store/menu'

const splitArea = () => {
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const persons = useSelector(state => state.personList)
  const order = useSelector(state => state.order)
  const { ableToSave } = useSelector(state => state.menu)

  const saveOrder = async e => {
    e.preventDefault()
    await addOrder(order).then(() => console.log('order added successfully!')).then(() => {
      dispatch(RESET_PERSON_LIST())
      dispatch(RESET_ORDER())
      dispatch(UPDATE_ABLE_TO_SAVE())
    })
    redirect('/')
  }

  return (
    <div className='p-3'>
      <form onSubmit={saveOrder}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Total<small className='text-muted'> (PKR)</small></th>
              <th scope='col'>Paid<small className='text-muted'> (PKR)</small></th>
              <th scope='col'>Bal<small className='text-muted'> (PKR)</small></th>
              <th scope='col'>Spliter</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {
              persons.map((person, idx) => (
                <tr key={`${idx.toString()}`}>
                  <td>{person.name}</td>
                  <td>{person.total}</td>
                  <td>{person.paid}</td>
                  <td className={person.balance > 0 ? 'text-success' : 'text-danger'}>
                    {person.balance > 0 ? `+${person.balance}` : person.balance}
                  </td>
                  <td>
                    {person.to.length > 0
                      && (
                        <ul className='list-group'>
                          {person.to.map(r => <li className='list-group-item bg-light fst-italic p-0' key={r.name}>{r.amount} Rs. to {r.name}</li>)}
                        </ul>
                      )}
                    {person.from.length > 0
                      && (
                        <ul className='list-group'>
                          {person.from.map(s => <li className='list-group-item bg-light fst-italic p-0' key={s.name}>{s.amount} Rs. from {s.name}</li>)}
                        </ul>
                      )}
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
