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
  await createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      addDoc(usersCollection, { email, name })
      updateProfile(user, {
        displayName: name,
      }).then(() => user)
        .catch(({ code, message }) => ({ code, message }))
    })
    .catch(({ code, message }) => ({ code, message }))
}

export const signedIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => userCredential.user)
    .catch(({ code, message }) => ({ code, message }))
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
