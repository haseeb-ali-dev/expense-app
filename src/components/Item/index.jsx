export default ({ item: { name, price } }) => (
  <div className='d-flex flex-row pb-1'>
    <small className='pe-2 fw-light'><small className='text-muted'>Name:</small> {name}</small>
    <small className='ps-2 fw-light'><small className='text-muted'>Price:</small> Rs. {price.toLocaleString('en-US') ?? 0}</small>
  </div>
)
