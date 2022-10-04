import ItemForm from 'components/ItemForm'

import 'containers/order/style.css'
import Resturant from 'components/Resturant'
import Items from 'components/Items'
import { db } from 'Database'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

const Order = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    getDocs(collection(db, 'values'))
      .then((data) => {
        const allDocs = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setItems(allDocs)
      })
  }, [])

  return (
    <div className='order-box'>
      <Resturant />
      <ItemForm setItems={setItems} />
      <Items items={items} />
    </div>
  )
}

export default Order
