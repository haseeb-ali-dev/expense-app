import { memo } from 'react'

export default memo(({ order }) => (
  <div className='mt-2 mx-1 border py-1 px-2 d-flex flex-column bg-light'>
    <p className='fs-5 p-1 mx-5'>
      Summary
    </p>
    <p>Grand:<span className='float-end'>Rs. {order.grand.toLocaleString('en-US')}</span></p>
    <p>Tip:<span className='float-end'>Rs. {order.tip.toLocaleString('en-US')}</span></p>
    <p>Tax:<span className='float-end'>{order.tax} %</span></p>
    <p>Delivery:<span className='float-end'>Rs. {order.delivery.toLocaleString('en-US')}</span></p>
    <p>Settled:
      <span className='text-success float-end'>
        Rs. {(order.grand - order.persons.reduce((acc, value) => acc + Math.abs(value.balance), 0)).toLocaleString('en-US')}
      </span>
    </p>
    {order.settleUp && <small className='text-muted fst-italic text-end'>settled up</small>}
    {(!order.settleUp && order.persons.some(p => p.balance === 0))
      && <small className='text-muted fst-italic text-end'>partially settled up</small>}
  </div>
))
