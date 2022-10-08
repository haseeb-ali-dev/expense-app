import {
  collection, getDocs, addDoc, setDoc, doc,
} from 'firebase/firestore'
import { db } from 'Database'

export const valuesCollection = collection(db, 'values')
export const ordersCollection = collection(db, 'orders')

export const getItems = async () => {
  const snapshot = await getDocs(valuesCollection)
  const allItems = snapshot.docs.map(document => ({ id: document.id, ...document.data() }))
  return allItems
}

export const addItem = async ({ name, price }) => {
  await addDoc(valuesCollection, { name, price })
}

export const addPersons = async (persons, id = null) => {
  await setDoc(doc(db, 'orders', id), { persons })
}
