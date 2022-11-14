import { memo } from 'react'
import { useDispatch } from 'react-redux'

import { removeOrder } from 'api/order'
import { REMOVE_ORDER } from 'store/orderList'
import { SET_MODAL_ORDER } from 'store/modal'

const OrderActions = ({
  loading, order, orderIdx, setLoading,
}) => {
  const dispatch = useDispatch()
  const handleClick = async () => {
    setLoading(true)
    if (confirm('This action is not reversible')) {
      await removeOrder(order.id)
      setLoading(false)
      dispatch(REMOVE_ORDER({ orderIdx }))
    }
  }

  return (
    <div className='mt-1 p-1 d-flex flex-column'>
      <button className='btn btn-sm btn-outline-success rounded-pill' onClick={() => dispatch(SET_MODAL_ORDER({ order }))}>Show Details</button>
      <button
        className='btn btn-sm btn-outline-danger rounded-pill mt-2'
        onClick={handleClick}
      >{loading ? 'Deleting....' : 'Delete Order'}
      </button>
    </div>
  )
}

export default memo(OrderActions)
