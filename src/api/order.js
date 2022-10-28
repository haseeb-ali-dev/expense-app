import {
  collection, addDoc, getDocs, doc, updateDoc, query, where, deleteDoc,
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

export const removeOrder = async (orderId) => {
  await deleteDoc(doc(db, 'orders', orderId))
}

export const getUserOrders = async (name) => {
  const queryResyult = query(orderCollection, where('users', 'array-contains', name))
  const querySnapshot = await getDocs(queryResyult)
  const userOrders = querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }))
  return userOrders
}

export const settleUp = async (orderId, persons, perPerson) => {
  const order = doc(db, 'orders', orderId)
  await updateDoc(order, { persons, settleUp: perPerson })
  return order
}
