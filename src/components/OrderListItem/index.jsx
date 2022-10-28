/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import ListItem from 'components/ListItem'

import { HIDE_MODAL, SET_MODAL_ORDER, SHOW_MODAL } from 'store/modal'
import { settleUp, removeOrder } from 'api/order'
import { UPDATE_ORDER_PERSONS } from 'store/orderList'

import settleUpIcon from 'assets/icons/settleup.svg'
import okIcon from 'assets/icons/ok.svg'
import ok2Icon from 'assets/icons/ok2.svg'

const orderListItem = ({ order, showDetails = false }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const viewOrder = detailedOrder => {
    dispatch(SET_MODAL_ORDER({ order: detailedOrder }))
    dispatch(SHOW_MODAL())
  }

  const settleUpOrder = async (orderId) => {
    const answer = confirm('Confirm to settle up!')
    if (answer) {
      setLoading(true)
      const newPersons = order.persons.map(({
        paid, receivable, payable, total, items, name,
      }) => {
        paid = total
        receivable = 0
        payable = 0
        return {
          items, name, paid, receivable, payable, total,
        }
      })
      await settleUp(orderId, newPersons).then(() => {
        setLoading(false)
        dispatch(UPDATE_ORDER_PERSONS({ orderId, persons: newPersons, all: true }))
        dispatch(HIDE_MODAL())
      })
    }
  }

  const settleUpPersonOrder = (orderId, personIdx, person) => {
    console.log(orderId, personIdx, person)
  }

  const settleUpReceivable = async (personIdx, { name: sNamee, amount }, sIndex) => {
    setLoading(true)
    const fromIndex = order.persons.findIndex(p => p.name === sNamee)
    const personName = order.persons[personIdx].name
    const updatedPersons = order.persons.map(({
      name, items, from, to, paid, total, balance,
    }, index) => {
      if (index === personIdx) {
        balance -= amount
        paid -= amount
        const temp1 = [...from]
        temp1.splice(sIndex, 1)
        from = temp1
      }
      if (index === fromIndex) {
        balance += amount
        paid += amount
        const temp2 = [...to]
        temp2.splice(temp2.indexOf({ name: personName, amount }), 1)
        to = temp2
      }
      return {
        name, items, from, to, paid, total, balance,
      }
    })
    const allFlag = updatedPersons.every(p => p.balance === 0)
    await settleUp(order.id, updatedPersons, allFlag).then(() => {
      setLoading(false)
      dispatch(UPDATE_ORDER_PERSONS({ orderId: order.id, persons: updatedPersons, all: allFlag }))
      dispatch(HIDE_MODAL())
    })
  }

  const settleUpPayable = async (personIdx, { name: rName, amount }, rIndex) => {
    setLoading(true)
    const toIndex = order.persons.findIndex(p => p.name === rName)
    const personName = order.persons[personIdx].name
    const updatedPersons = order.persons.map(({
      name, items, from, to, paid, total, balance,
    }, index) => {
      if (index === toIndex) {
        balance -= amount
        paid -= amount
        const temp1 = [...from]
        temp1.splice(temp1.indexOf({ name: personName, amount }), 1)
        from = temp1
      }
      if (index === personIdx) {
        balance += amount
        paid += amount
        const temp2 = [...to]
        temp2.splice(rIndex, 1)
        to = temp2
      }
      return {
        name, items, from, to, paid, total, balance,
      }
    })
    const allFlag = updatedPersons.every(p => p.balance === 0)
    await settleUp(order.id, updatedPersons, allFlag).then(() => {
      setLoading(false)
      dispatch(UPDATE_ORDER_PERSONS({ orderId: order.id, persons: updatedPersons, all: allFlag }))
      dispatch(HIDE_MODAL())
    })
  }

  const deleteOrder = async () => {
    await removeOrder(order.id)
  }

  return (
    <div className='border border-1 rounded-2 m-1 p-2'>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>{order.resturant}</h5>
      </div>
      <div className='mb-1 d-inline-flex flex-wrap'>
        <div className='mt-2 mx-1 border py-1 px-2 d-flex flex-column bg-light'>
          <p className='fs-5 p-1'>
            Summary
            <button type='button' className='btn btn-sm btn-danger' onClick={deleteOrder} hidden>Del</button>
          </p>
          <p> <span className='text-muted'>Grand: PKR/-</span> {order.grand}</p>
          <p> <span className='text-muted'>Tip: PKR/-</span> {order.tip}</p>
          <p> <span className='text-muted'>Tax: </span> {order.tax} %</p>
          <p> <span className='text-muted'>Delivery: PKR/-</span> {order.delivery}</p>
          {(!showDetails && order.settleUp) && <small className='text-muted fst-italic text-end'>settled up</small>}
          {(!showDetails && !order.settleUp && order.persons.some(p => p.balance === 0)) && <small className='text-muted fst-italic text-end'>partially settled up</small>}
        </div>
        {showDetails && order.persons.map((person, index) => (
          <div className='mt-2 mx-1 border py-1 px-2 d-flex flex-column bg-light flex-wrap' key={`person-${index.toString()}`}>
            <div className='d-flex flex-row justify-content-between p-1'>
              {person.name}
              {person.balance === -2
                && (
                  <button type='button' className='btn btn-sm' onClick={() => settleUpPersonOrder(order.id, index)}>
                    {loading ? <span>...</span> : <img src={settleUpIcon} alt='Settle' />}
                  </button>
                )}
            </div>
            <div><small className='text-muted'>Total: PKR/- </small> {person.total}</div>
            <div><small className='text-muted'>Paid: PKR/- </small> {person.paid}</div>
            <div><small className='text-muted'>Balance: </small>
              <span className={person.balance > 0 ? 'text-success' : 'text-danger'}>
                {person.balance > 0 ? `+${person.balance}` : person.balance}
              </span>
            </div>
            {person.to.length > 0
              && (
                <>
                  <div className='fs-6 mt-2 text-danger'>Payables</div>
                  <div>
                    <ul className='list-group'>
                      {person.to.map((r, rIndex) => (
                        <li className='list-group-item bg-light fst-italic p-0' key={r.name}>
                          {r.amount} Rs. to {r.name}
                          {loading ? <span className='text-danger mx-1 p-0 float-end'>...</span>
                            : (
                              <button type='button' className='btn btn-sm p-0 float-end' onClick={() => settleUpPayable(index, r, rIndex)}>
                                <img src={ok2Icon} alt='ok' />
                              </button>
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            {person.from.length > 0
              && (
                <>
                  <div className='fs-6 mt-2 text-success'>Receivables</div>
                  <div>
                    <ul className='list-group'>
                      {person.from.map((s, sIndex) => (
                        <li className='list-group-item bg-light fst-italic p-0' key={s.name}>
                          {s.amount} Rs. from {s.name}
                          {loading ? <span className='text-success mx-1 p-0 float-end'>...</span>
                            : (
                              <button type='button' className='btn btn-sm p-0 float-end' onClick={() => settleUpReceivable(index, s, sIndex)}>
                                <img src={okIcon} alt='ok' />
                              </button>
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            <div className='fs-5 mt-2'>Items:</div>
            <div>
              {person.items.map(item => <ListItem item={item} key={item.name} />)}
            </div>
            {person.balance === 0 && <div className='text-end'><small className='text-muted fst-italic'>settled up</small></div>}
          </div>
        ))}
      </div>
      {
        showDetails
        && (
          <div className='w-100 text-end mt-1 p-1'>
            {!order.settleUp ? (
              <button type='button' className='btn btn-outline-success rounded-pill' onClick={() => settleUpOrder(order.id)}>
                {loading && <span className='spinner-border spinner-border-sm mx-1' role='status' aria-hidden='true' />}
                {loading ? 'Settling Up All...' : 'Settle Up All'}
              </button>
            ) : (
              <p className='m-0 fst-italic'>Accounts are Settled Up!!</p>
            )}
          </div>
        )
      }
      {
        !showDetails
        && (
          <div className='w-100 mt-1 text-end p-1'>
            <button type='button' className='btn btn-sm btn-outline-success rounded-pill' onClick={() => viewOrder(order)}>Show Details</button>
          </div>
        )
      }
    </div>
  )
}

export default orderListItem
