import { removeOrder } from 'api/order'

import { removeIcon } from 'assets/icons'

const orderSummary = ({ order }) => {
  const deleteOrder = async () => {
    await removeOrder(order.id)
  }

  return (
    <div className='mt-2 mx-1 border py-1 px-2 d-flex flex-column bg-light'>
      <p className='fs-5 p-1'>
        Summary
        <button className='btn btn-sm btn-danger' onClick={deleteOrder} hidden>
          <img src={removeIcon} alt='D' />
        </button>
      </p>
      <p> <span className='text-muted'>Grand: Rs.</span> {order.grand}</p>
      <p> <span className='text-muted'>Tip: Rs.</span> {order.tip}</p>
      <p> <span className='text-muted'>Tax: </span> {order.tax} %</p>
      <p> <span className='text-muted'>Delivery: Rs.</span> {order.delivery}</p>
      {order.settleUp && <small className='text-muted fst-italic text-end'>settled up</small>}
      {(!order.settleUp && order.persons.some(p => p.balance === 0))
        && <small className='text-muted fst-italic text-end'>partially settled up</small>}
    </div>
  )
}

export default orderSummary
