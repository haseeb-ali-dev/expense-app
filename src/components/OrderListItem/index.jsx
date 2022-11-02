/* eslint-disable no-param-reassign */
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { SET_MODAL_ORDER } from 'store/modal'

import {
  OrderPersonItems, OrderSettleUp, OrderSummary, Payables,
  PersonDetail, Receivables,
} from 'components'

const orderItem = ({ order, showDetails = false }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  return (
    <div className='border border-1 rounded-2 m-1 p-2'>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>{order.resturant}</h5>
      </div>
      <div className='mb-1 d-inline-flex flex-wrap'>
        <OrderSummary order={order} />
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
            <div className='mt-1 text-end p-1'>
              <button className='btn btn-sm btn-outline-success rounded-pill' onClick={() => dispatch(SET_MODAL_ORDER({ order }))}>Show Details</button>
            </div>
          )}
      </div>
    </div>
  )
}

export default orderItem
