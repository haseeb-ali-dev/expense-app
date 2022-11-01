import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile, signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth'
import { auth, db } from 'Database'
import {
  addDoc, collection, getDocs, query, where,
} from 'firebase/firestore'

export const usersCollection = collection(db, 'users')

export const signedUp = async (email, password, name) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  await addDoc(usersCollection, { email, name })
  await updateProfile(user, { displayName: name })
  return { user }
}

export const signedIn = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
    .then(result => {
      const { accessToken } = GoogleAuthProvider.credentialFromResult(result)
      const { user: { displayName, email } } = result
      getDocs(query(usersCollection, where('email', '==', email)))
        .then(res => res.empty
          && addDoc(usersCollection, { email, name: displayName, accessToken }))
    }).catch(error => {
      const { code, message, customData: { email } } = error
      const credential = GoogleAuthProvider.credentialFromError(error)
      return {
        code, message, customData: { email }, credential,
      }
    })
}

export const getUsers = async () => {
  const querySnapshot = await getDocs(usersCollection)
  return querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }))
}
