import {
  collection, addDoc, getDocs,
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
