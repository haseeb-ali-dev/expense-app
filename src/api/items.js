import { db } from 'Database'
import { collection, getDocs, addDoc } from 'firebase/firestore'

export const ordersCollection = collection(db, 'values')

export const getItems = async () => {
  const snapshot = await getDocs(ordersCollection)
  const allItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return allItems
}

export const addItem = async ({ name, price }) => {
  await addDoc(ordersCollection, { name, price })
}
