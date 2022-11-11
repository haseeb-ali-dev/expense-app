import { memo } from 'react'

export default memo(({ person }) => (
  <>
    <div className='d-flex flex-row justify-content-between mx-auto px-1 py-2 my-1 fs-6'>
      {person.name}
    </div>
    <div><small>Total:</small><span className='float-end fw-light'>Rs. {person.total.toLocaleString('en-US')}</span></div>
    <div><small>Paid:</small><span className='float-end fw-light'>Rs. {person.paid.toLocaleString('en-US')}</span></div>
    <div><small>Balance:</small>
      <span className={`float-end ${person.balance > 0 ? 'text-success' : 'text-danger'}`}>
        {person.balance > 0 ? `+${person.balance}` : person.balance}
      </span>
    </div>
  </>
))
