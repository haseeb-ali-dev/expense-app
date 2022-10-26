import {
  collection, addDoc, getDocs, doc, updateDoc,
} from 'firebase/firestore'
import { db } from 'Database'

export const orderCollection = collection(db, 'orders')

export const addOrder = async (order) => {
  await addDoc(orderCollection, order)
}

export const getOrders = async () => {
  const querySnapshot = await getDocs(orderCollection)
  const allOrders = querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }))
  return allOrders
}

export const settleUp = async (orderId, persons) => {
  const order = doc(db, 'orders', orderId)
  await updateDoc(order, { persons, receivers: [], settleUp: true })
  return order
}
