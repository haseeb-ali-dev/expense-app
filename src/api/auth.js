import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db, auth } from 'Database'
import {
  collection, addDoc, getDocs,
} from 'firebase/firestore'

export const usersCollection = collection(db, 'users')

export const signedUp = async (email, password, name) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential
      addDoc(usersCollection, { email, name })
      updateProfile(user, {
        displayName: name,
      }).then(() => {
        console.log('Profile updated')
      }).catch((error) => {
        const { code, message } = error
        return { code, message }
      })
      return user
    })
    .catch((error) => {
      const { code, message } = error
      return { code, message }
    })
}

export const signedIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential
      return user
    })
    .catch((error) => {
      const { code, message } = error
      return { code, message }
    })
}

export const getUsers = async () => {
  const querySnapshot = await getDocs(usersCollection)
  const allUsers = querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }))
  return allUsers
}
