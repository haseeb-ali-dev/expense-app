import { memo } from 'react'
import { useSelector } from 'react-redux'

const OrderItems = () => {
  const { grand } = useSelector(state => state.order)
  const { items: menuItems } = useSelector(state => state.menu)
  const persons = useSelector(state => state.personList)

  const itemsObj = {}
  menuItems.forEach(({ name }) => {
    itemsObj[name] = 0
  })

  persons.forEach(({ items }) => items.forEach(({ name }) => itemsObj[name]++))

  return (
    <div className='px-2'>
      <div className='my-3'>
        <p className='fs-4'>Order Summary</p>
      </div>
      <div className='d-flex flex-column justify-content-center'>
        {Object.keys(itemsObj).map(key => <p className='m-1' key={key}>{itemsObj[key]} x {key} {itemsObj[key] > 1 && '(s)'}</p>)}
      </div>
      <div className='my-2'>
        <div className='border p-1 bg-white'>
          Grand Total: Rs. {grand.toLocaleString('en-US')}
        </div>
      </div>
    </div>
  )
}

export default memo(OrderItems)
