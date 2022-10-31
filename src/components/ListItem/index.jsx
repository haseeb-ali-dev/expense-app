const listItem = ({ item }) => (
  <div className='d-flex flex-row pb-1'>
    <small className='pe-2 fw-light'><small className='text-muted'>Name:</small> {item.name}</small>
    <small className='ps-2 fw-light'><small className='text-muted'>Price:</small> Rs. {item.price ?? 0}</small>
  </div>
)

export default listItem
