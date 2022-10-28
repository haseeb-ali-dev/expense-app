import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from 'Database'
import { addDoc, collection, getDocs } from 'firebase/firestore'

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

export const getUsers = async () => {
  const querySnapshot = await getDocs(usersCollection)
  return querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }))
}
