/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ADD_ORDER_LIST } from 'store/orderList'
import { getUserOrders } from 'api/order'

import Loader from 'components/Loader'
import Modal from 'components/Modal'
import OrderListItem from 'components/OrderListItem'

const ordersList = () => {
  const dispatch = useDispatch()
  const { show, modalOrder } = useSelector(state => state.modal)
  const orderList = useSelector(state => state.orderList)
  const { name } = useSelector(state => state.user)

  const [fetched, setFetched] = useState(false)
  const [ordersss, setOrdersss] = useState(orderList)

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getUserOrders(name)
      setFetched(!fetched)
      dispatch(ADD_ORDER_LIST({ list: fetchedOrders }))
    }
    fetchOrders()
  }, [name])

  useEffect(() => {
    setOrdersss(orderList)
  }, [orderList])

  const ordersListing = ordersss.map(order => <OrderListItem order={order} key={order.id} />)
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
