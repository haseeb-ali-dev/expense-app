import {
  collection, addDoc,
} from 'firebase/firestore'
import { db } from 'Database'

export const orderCollection = collection(db, 'orders')

export const addOrder = async (order) => {
  await addDoc(orderCollection, order)
}
