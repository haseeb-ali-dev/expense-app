import { useDispatch } from 'react-redux'

import { SET_MODAL_ORDER, SHOW_MODAL } from 'store/modal'

import ListItem from 'components/ListItem'

const orderListItem = ({ order, showDetails = false }) => {
  const dispatch = useDispatch()
  const viewOrder = (detailedOrder) => {
    dispatch(SET_MODAL_ORDER({ order: detailedOrder }))
    dispatch(SHOW_MODAL())
  }

  return (
    <div className='border border-1 rounded-2 m-1 p-2'>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>{order.resturant}</h5>
      </div>
      <div className='mb-1 d-inline-flex flex-wrap'>
        <div className='mt-2 mx-1 border py-1 px-2 d-flex flex-column bg-light'>
          <p className='fs-5 p-1'>Summary</p>
          <p> <span className='text-muted'>Grand: PKR/-</span> {order.grand}</p>
          <p> <span className='text-muted'>Tip: PKR/-</span> {order.grand}</p>
          <p> <span className='text-muted'>Tax: PKR/-</span> {order.grand}</p>
          <p> <span className='text-muted'>Delivery: PKR/-</span> {order.grand}</p>
        </div>
        {showDetails && order.persons.map((person, idx) => (
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
      {!showDetails
        && (
          <div className='w-100 mt-1 text-end p-1'>
            <button type='button' className='btn btn-sm btn-outline-success rounded-pill' onClick={() => viewOrder(order)}>Show Details</button>
          </div>
        )}
    </div>
  )
}

export default orderListItem
