// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
} from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc 
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFqU64TOTE-2TL2ZfyOsFrL-KC-m2lMho",
  authDomain: "shopping-6fa35.firebaseapp.com",
  projectId: "shopping-6fa35",
  storageBucket: "shopping-6fa35.appspot.com",
  messagingSenderId: "251653026461",
  appId: "1:251653026461:web:bc8d3345b6febf8cefda74"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () =>
 signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
 signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createAuthUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}