/* eslint-disable no-plusplus */
import { useSelector } from 'react-redux'

const orderItems = () => {
  const { grand } = useSelector(state => state.order)
  const { items: menuItems } = useSelector(state => state.menu)
  const persons = useSelector(state => state.personList)

  const itemsObj = {}
  menuItems.forEach(({ name }) => {
    itemsObj[name] = 0
  })
  persons.forEach(({ items }) => items.forEach(({ name }) => itemsObj[name]++))

  return (
    <div className='px-3'>
      <div className='my-3'>
        <p className='fs-4'>Order Summary</p>
      </div>
      <div className='d-flex flex-column justify-content-center'>
        {Object.keys(itemsObj).map(key => <p className='mx-3 my-1'>{itemsObj[key]} {key} {itemsObj[key] > 1 && ' (s)'}</p>)}
      </div>
      <div className='text-end my-1'>
        <div className='border p-1'>
          <span className='fs-5'>Grand Total:</span> PKR {grand}
        </div>
      </div>
    </div>
  )
}

export default orderItems
