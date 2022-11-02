/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { SET_MODAL_ORDER } from 'store/modal'
import { removeOrder } from 'api/order'
import { REMOVE_ORDER } from 'store/orderList'

import {
  OrderPersonItems, OrderSettleUp, OrderSummary, Payables,
  PersonDetail, Receivables,
} from 'components'

const orderItem = ({ order, orderIdx, showDetails = false }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  return (
    <div className='border border-1 rounded-2 m-1 p-2 overflow-auto'>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>{order.resturant}</h5>
      </div>
      <OrderSummary order={order} />
      <div className='mb-1 d-inline-flex flex-wrap'>
        {showDetails
          ? (
            <>
              {order.persons.map((person, index) => (
                <div className='mt-2 mx-1 border py-1 px-2 d-flex flex-column bg-light flex-wrap' key={`person-${index.toString()}`}>
                  <PersonDetail person={person} />
                  <Payables
                    person={person}
                    pIndex={index}
                    loading={loading}
                    setLoading={setLoading}
                    order={order}
                    dispatch={dispatch}
                  />
                  <Receivables
                    person={person}
                    pIndex={index}
                    loading={loading}
                    setLoading={setLoading}
                    order={order}
                    dispatch={dispatch}
                  />
                  <OrderPersonItems person={person} />
                </div>
              ))}
              <OrderSettleUp order={order} loading={loading} setLoading={setLoading} />
            </>
          ) : (
            <div className='mt-1 p-1 d-flex flex-column'>
              <button className='btn btn-sm btn-outline-success rounded-pill' onClick={() => dispatch(SET_MODAL_ORDER({ order }))}>Show Details</button>
              <button
                className='btn btn-sm btn-outline-danger rounded-pill my-1'
                onClick={async () => {
                  setLoading(true)
                  if (confirm('This action is not reversible')) {
                    await removeOrder(order.id)
                    setLoading(false)
                    dispatch(REMOVE_ORDER({ orderIdx }))
                  }
                }}
              >{loading ? 'Deleting....' : 'Delete Order'}
              </button>
            </div>
          )}
      </div>
    </div>
  )
}

export default orderItem
