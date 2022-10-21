/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'

import { getOrders } from 'api/order'

import ListItem from 'components/ListItem'

const ordersList = () => {
  const [orders, setOrders] = useState([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders()
      setFetched(!fetched)
      setOrders(fetchedOrders)
    }
    fetchOrders()
  }, [])

  const ordersListing = orders.map(order => (
    <div className='list-group-item list-group-item-action' key={order.id}>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>{order.resturant}</h5>
      </div>
      <div className='mb-1 d-inline-flex flex-wrap'>
        <div className='mt-2 mx-1 border py-1 px-2 d-flex flex-column bg-light'>
          <p className='fs-4 p-1'>Summary</p>
          <p> <span className='text-muted'>Grand: PKR/-</span> {order.grand}</p>
          <p> <span className='text-muted'>Tip: PKR/-</span> {order.grand}</p>
          <p> <span className='text-muted'>Tax: PKR/-</span> {order.grand}</p>
          <p> <span className='text-muted'>Delivery: PKR/-</span> {order.grand}</p>
        </div>
        {order.persons.map((person, idx) => (
          <div className='mt-2 mx-1 border py-1 px-2 d-flex flex-column bg-light flex-wrap' key={`person-${idx.toString()}`}>
            <div className='fs-5 p-2'>{person.name}</div>
            <div><small className='text-muted'>Total: PKR/- </small> {person.total}</div>
            <div><small className='text-muted'>Paid: PKR/- </small> {person.paid}</div>
            <div><small className='text-muted'>Receiable: PKR/- </small><span className='text-success'>{person.receivable}</span></div>
            <div><small className='text-muted'>Payable: PKR/- </small>
              <span className='text-danger'>
                {person.payable}
                {(person.payable !== 0 && order.receivers.length !== 0)
                  ? ` to ${order.receivers.map(r => ` ${r.name} `)}`
                  : ''}
              </span>
            </div>
            <div className='fs-5 mt-2'>Items:</div>
            <div>
              {person.items.map(item => <ListItem item={item} key={item.name} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  ))
  const displayOrders = <div className='list-group p-2'>{ordersListing}</div>
  const loading = (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='spinner-grow text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
  const noOrders = <p className='text-center h6'>No order found!</p>

  return fetched ? (orders.length === 0 ? noOrders : displayOrders) : loading
}

export default ordersList
