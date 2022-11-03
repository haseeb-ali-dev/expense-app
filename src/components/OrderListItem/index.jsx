/* eslint-disable max-len */
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import {
  OrderPersonItems, OrderSettleUp, OrderSummary,
  Payables, OrderActions, PersonDetail, Receivables,
} from 'components'

const OrderItem = ({ order, orderIdx, showDetails = false }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const orderActions = <OrderActions order={order} orderIdx={orderIdx} loading={loading} setLoading={setLoading} />
  const orderSettlup = <OrderSettleUp order={order} loading={loading} setLoading={setLoading} />

  return (
    <div className='border border-1 rounded-2 m-1 p-2 overflow-auto'>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>{order.resturant}</h5>
      </div>
      <div className='mb-1 d-inline-flex flex-wrap'>
        <OrderSummary order={order} />
        {showDetails && order.persons.map((person, index) => (
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
      </div>
      {showDetails ? orderSettlup : orderActions}
    </div>
  )
}

export default OrderItem
