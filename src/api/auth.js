import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'Database'

export const signedUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential
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

export const test = ''
