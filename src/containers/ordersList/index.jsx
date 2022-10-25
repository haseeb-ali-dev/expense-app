/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getOrders } from 'api/order'

import Modal from 'components/Modal'
import OrderListItem from 'components/OrderListItem'

const ordersList = () => {
  const { show } = useSelector(state => state.modal)
  const [orders, setOrders] = useState([])
  const [fetched, setFetched] = useState(false)
  const [modalOrder, setModalOrder] = useState()

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders()
      setFetched(!fetched)
      setOrders(fetchedOrders)
    }
    fetchOrders()
  }, [])

  const ordersListing = orders.map(order => (
    <OrderListItem
      order={order}
      openModal={setModalOrder}
      key={order.id}
    />
  ))
  const displayOrders = (
    <div className='d-inline-flex flex-wrap p-2'>
      {ordersListing}
      {show && <Modal html={<OrderListItem order={modalOrder} showDetails />} />}
    </div>
  )
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
