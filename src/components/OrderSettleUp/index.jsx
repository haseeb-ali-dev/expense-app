/* eslint-disable no-param-reassign */
import { memo } from 'react'
import { useDispatch } from 'react-redux'

import { HIDE_MODAL } from 'store/modal'
import { settleUp } from 'api/order'
import { UPDATE_ORDER_PERSONS } from 'store/orderList'

const OrderSettleUp = ({ order, loading, setLoading }) => {
  const dispatch = useDispatch()

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

  return (
    <div className='w-100 mt-1 p-1 text-end'>
      {!order.settleUp ? (
        <button className='btn btn-sm btn-outline-success rounded-pill' onClick={() => settleUpOrder(order.id)}>
          {loading && <span className='spinner-border spinner-border-sm mx-1' role='status' aria-hidden='true' />}
          {loading ? 'Settling Up All...' : 'Settle Up All'}
        </button>
      ) : (
        <p className='m-0 fst-italic'>Accounts are Settled Up!!</p>
      )}
    </div>
  )
}

export default memo(OrderSettleUp)
