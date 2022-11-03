import { memo } from 'react'

export default memo(({ person }) => (
  <>
    <div className='d-flex flex-row justify-content-between p-1'>
      {person.name}
    </div>
    <div><small className='text-muted'>Total: Rs. </small> {person.total.toLocaleString('en-US')}</div>
    <div><small className='text-muted'>Paid: Rs. </small> {person.paid.toLocaleString('en-US')}</div>
    <div><small className='text-muted'>Balance: </small>
      <span className={person.balance > 0 ? 'text-success' : 'text-danger'}>
        {person.balance > 0 ? `+${person.balance}` : person.balance}
      </span>
    </div>
  </>
))
