import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile, signInWithPopup, GoogleAuthProvider,
  FacebookAuthProvider, sendPasswordResetEmail, updatePassword,
} from 'firebase/auth'
import { auth, db, storage } from 'Database'
import {
  setDoc, collection, getDocs, query, updateDoc, where, doc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import defaultAvatar from 'utils/constants/defaultAvatar'

export const usersCollection = collection(db, 'users')

export const signedUp = async (email, password, name) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  await setDoc(doc(db, 'users', user.uid), { email, name, avatar: defaultAvatar })
  await updateProfile(user, { displayName: name, photoURL: defaultAvatar })
  return { user }
}

export const signedIn = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return { user }
}
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  const { accessToken } = GoogleAuthProvider.credentialFromResult(result)
  const {
    user: {
      displayName, email, photoURL, uid,
    },
  } = result
  await getDocs(query(usersCollection, where('email', '==', email)))
    .then(res => res.empty
      && setDoc(doc(db, 'users', uid), {
        email, name: displayName, accessToken, avatar: photoURL ?? defaultAvatar,
      }))
  // const { code, message, customData: { email } } = error
  // const credential = GoogleAuthProvider.credentialFromError(error)
  return {
    accessToken, displayName, email, photoURL,
  }
}

export const loginWithFacebook = async () => {
  const provider = new FacebookAuthProvider()
  provider.addScope('email')
  await signInWithPopup(auth, provider)
    .then(result => {
      const { accessToken } = FacebookAuthProvider.credentialFromResult(result)
      const {
        user: {
          displayName, email, photoURL, uid,
        },
      } = result
      getDocs(query(usersCollection, where('email', '==', email)))
        .then(res => res.empty
          && setDoc(doc(db, 'users', uid), {
            email, name: displayName, accessToken, avatar: photoURL,
          }))
    }).catch(error => {
      const { code, message, customData: { email } } = error
      const credential = FacebookAuthProvider.credentialFromError(error)
      return {
        code, message, customData: { email }, credential,
      }
    })
}

export const avatarUpload = async file => {
  const fileRef = ref(storage, `${auth.currentUser.uid}.png`)
  await uploadBytes(fileRef, file)
  const photoURL = await getDownloadURL(fileRef)
  await updateDoc(doc(db, 'users', auth.currentUser.uid), { avatar: photoURL })
  await updateProfile(auth.currentUser, { photoURL })
  return { photoURL, name: auth.currentUser.displayName }
}

export const updateName = async name => {
  await updateDoc(doc(db, 'users', auth.currentUser.uid), { name })
  await updateProfile(auth.currentUser, { displayName: name })
  return { name, photoURL: auth.currentUser.photoURL }
}

export const sendResetLink = async email => {
  const actionCodeSettings = {
    url: 'https://www.google.com/',
    handleCodeInApp: false,
  }
  await sendPasswordResetEmail(auth, email, actionCodeSettings)
}

export const editPassword = async newPassword => {
  await updatePassword(auth.currentUser, newPassword)
}

export const getUsers = async () => {
  const querySnapshot = await getDocs(usersCollection)
  return querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }))
}
