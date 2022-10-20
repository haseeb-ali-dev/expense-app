import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  //  collection, doc, addDoc, updateDoc, deleteDoc, getDocs,
} from 'firebase/firestore'

import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)

// const createDoc = async (colection, data) => {
//   await addDoc(collection(db, colection), data)
//     .then(() => {
//       console.log('Value successfully written!')
//     })
//     .catch((error) => {
//       console.error('Error writing Value: ', error)
//     })
// }

// const editDoc = async (colection, data, docID) => {
//   await updateDoc(doc(db, colection, String(docID)), data)
//     .then(() => {
//       console.log('Value successfully updated!')
//     })
//     .catch((error) => {
//       console.error('Error updating Value: ', error)
//     })
// }

// const delDoc = async (colection, docId) => {
//   await deleteDoc(doc(db, colection, String(docId)))
//     .then(() => {
//       console.log('Value successfully deleted!')
//     })
//     .catch((error) => {
//       console.error('Error deleting Value: ', error)
//     })
// }

// const getDocData = async (colection) => {
//   await getDocs(collection(db, colection))
//     .then((data) => {
//       const allDocs = []
//       data.forEach(document => allDocs.push(document.data()))
//       return allDocs
//     })
//     .catch((error) => {
//       console.error('Error getting all Values: ', error)
//     })
// }

// export {
//   createDoc, editDoc, delDoc, getDocData,
// }
