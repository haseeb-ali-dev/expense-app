/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Loader, Modal, OrderListItem } from 'components'

import { ADD_ORDER_LIST } from 'store/orderList'
import { getUserOrders } from 'api/order'

import { emptyIcon } from 'assets/icons'

const OrdersList = () => {
  const dispatch = useDispatch()
  const { showOrder, modalOrder } = useSelector(state => state.modal)
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

  const ordersListing = ordersss.map((order, index) => <OrderListItem order={order} orderIdx={index} key={order.id} />)
  const displayOrders = (
    <div className='d-inline-flex flex-wrap p-2'>
      {ordersListing}
      {showOrder && <Modal html={<OrderListItem order={modalOrder} showDetails />} />}
    </div>
  )
  const placeholder = <img className='position-fixed top-50 start-50 translate-middle' src={emptyIcon} alt='no orders' width={200} height={200} />

  return fetched ? (orderList.length === 0 ? placeholder : displayOrders) : <Loader />
}

export default OrdersList
