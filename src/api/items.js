import { db } from 'Database'
import { collection, getDocs } from 'firebase/firestore'

export const getItems = async () => {
  const snapshot = await getDocs(collection(db, 'values'))
  const allItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return allItems
}

export const temp = ''
