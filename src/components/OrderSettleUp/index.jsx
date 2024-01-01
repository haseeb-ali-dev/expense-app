/* eslint-disable no-param-reassign */
import { memo } from 'react'
import { useDispatch } from 'react-redux'

import { swal } from 'components'

import { HIDE_MODAL } from 'store/modal'
import { settleUp } from 'api/order'
import { UPDATE_ORDER_PERSONS } from 'store/orderList'

const OrderSettleUp = ({ order, loading, setLoading }) => {
  const dispatch = useDispatch()

  const settleUpOrder = async orderId => {
    const answer = confirm('Confirm to settle up!')
    if (answer) {
      setLoading(true)
      const newPersons = order.persons.map(({
        paid, balance, tempBalance, total, items, name, id, to, from,
      }) => {
        paid = total
        balance = 0
        tempBalance = 0
        to = []
        from = []
        return {
          paid, balance, tempBalance, total, items, name, id, to, from,
        }
      })
      await settleUp(orderId, newPersons, true).then(() => {
        setLoading(false)
        dispatch(UPDATE_ORDER_PERSONS({ orderId, persons: newPersons, all: true }))
        swal({ text: 'Order is completely settled up', icon: 'success' })
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
