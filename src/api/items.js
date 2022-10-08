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

export const addResturantAndItems = async (resturant, items, id = null) => {
  if (id) {
    await setDoc(doc(db, 'orders', id), { resturant, items })
    return id
  }
  const refId = await addDoc(ordersCollection, { resturant, items })
  return refId.id
}
