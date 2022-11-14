import { memo } from 'react'

const Item = ({ item: { name, price } }) => (
  <div className='d-flex flex-row pb-1'>
    <small className='pe-1 fw-light'>{name}</small>
    <small className='text-muted'>@</small>
    <small className='ps-1 fw-light'>Rs. {price.toLocaleString('en-US') ?? 0}</small>
  </div>
)

export default memo(Item)
