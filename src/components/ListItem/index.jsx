const listItem = ({ item }) => (
  <div className='d-flex flex-row pb-1'>
    <span className='pe-2 fw-light'><small className='text-muted'>Name:</small> {item.name}</span>
    <span className='ps-2 fw-light'><small className='text-muted'>Price:</small> PKR {item.price ?? 0}</span>
  </div>
)

export default listItem
