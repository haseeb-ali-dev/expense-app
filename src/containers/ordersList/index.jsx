/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ADD_ORDER_LIST } from 'store/orderList'
import { getOrders } from 'api/order'

import Loader from 'components/Loader'
import Modal from 'components/Modal'
import OrderListItem from 'components/OrderListItem'

const ordersList = () => {
  const dispatch = useDispatch()
  const { show, modalOrder } = useSelector(state => state.modal)
  const orderList = useSelector(state => state.orderList)

  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders()
      setFetched(!fetched)
      dispatch(ADD_ORDER_LIST({ list: fetchedOrders }))
    }
    fetchOrders()
  }, [])

  const ordersListing = orderList.map(order => <OrderListItem order={order} key={order.id} />)
  const displayOrders = (
    <div className='d-inline-flex flex-wrap p-2'>
      {ordersListing}
      {show && <Modal html={<OrderListItem order={modalOrder} showDetails />} />}
    </div>
  )
  const loading = <Loader />
  const noOrders = <p className='text-center h6'>No order found!</p>

  return fetched ? (orderList.length === 0 ? noOrders : displayOrders) : loading
}

export default ordersList
