import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";
import { auth } from "./firebaseSetup";

export async function saveUserInfo(info) {
  try {
    await setDoc(doc(database, "users", auth.currentUser.uid), info, {
      merge: true,
    });
  } catch (err) {
    console.log("save user info ", err);
  }
}
// add getUserInfo and use getDoc()
// return data
export async function getUserInfo() {
  try {
    const docSnapshot = await getDoc(
      doc(database, "users", auth.currentUser.uid)
    );
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
  } catch (err) {
    console.log("save user info ", err);
  }
}
export async function writeToDB(goal) {
  try {
    const docRef = await addDoc(collection(database, "goals"), {
      ...goal,
      user: auth.currentUser.uid,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(database, "goals", id));
  } catch (err) {
    console.log(err);
  }
}
