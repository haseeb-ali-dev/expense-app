import {
  collection, addDoc, getDocs, doc, updateDoc, query, where,
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

export const getUserOrders = async (name) => {
  const queryResyult = query(orderCollection, where('users', 'array-contains', name))
  const querySnapshot = await getDocs(queryResyult)
  const userOrders = querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }))
  return userOrders
}

export const settleUp = async (orderId, persons) => {
  const order = doc(db, 'orders', orderId)
  await updateDoc(order, { persons, receivers: [], settleUp: true })
  return order
}
