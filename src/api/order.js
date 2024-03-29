import {
  collection, addDoc, getDocs, doc, updateDoc, query, where, deleteDoc,
} from 'firebase/firestore'
import { db } from 'Database'

export const orderCollection = collection(db, 'orders')

export const addOrder = async order => {
  await addDoc(orderCollection, order)
}

export const getOrders = async () => {
  const querySnapshot = await getDocs(orderCollection)
  return querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }))
}

export const removeOrder = async orderId => {
  await deleteDoc(doc(db, 'orders', orderId))
}

export const getUserOrders = async id => {
  const queryResyult = query(orderCollection, where('users', 'array-contains', id))
  const querySnapshot = await getDocs(queryResyult)
  return querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }))
}

export const settleUp = async (orderId, persons, perPerson) => {
  const order = doc(db, 'orders', orderId)
  await updateDoc(order, { persons, settleUp: perPerson })
  return order
}
