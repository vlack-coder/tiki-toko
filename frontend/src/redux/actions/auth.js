import firebase from "firebase";
require("firebase/firebase-auth");

import { USER_STATE_CHANGE } from "../constants";
import { getPostsByUser } from "./post";
import { auth } from "../../../App";
import { firestore } from "../../../App";

// const db = firebase.firestore();

export const userAuthStateListener = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(getCurrentUserData());
      dispatch(getPostsByUser(auth.currentUser.uid));
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });
};

export const getCurrentUserData = () => (dispatch) => {
//   console.log("auth.currentUser.uid", auth.currentUser.uid);
//   console.log("auth.currentUser.uid", auth.uid);
  firestore
    .collection("user")
    // .doc(auth.currentUser.uid)
    // .doc(`user/${auth.uid}`)
    .doc(auth.uid)
    .onSnapshot((res) => {
        console.log("res", res.data());
      if (res.exists) {
        return dispatch({
          type: USER_STATE_CHANGE,
          currentUser: res.data(),
          loaded: true,
        });
      }
    });
};

export const login = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });

// export const register = (email, password) => (dispatch) =>
//   new Promise((resolve, reject) => {
//     auth
//       .createUserWithEmailAndPassword(email, password)
//       .then((user) => {
//         console.log("user", user);
//         const ass = firestore
//           .collection("user")
//           .doc(user.uid)
//           .set(JSON.parse(JSON.stringify(user)));

//         //   firestore.collection("user").doc(user.uid).set
//         // currentUserObj
//         console.log("ass", ass);
//         return ass;
//         // resolve(
//         //   firestore
//         //     .collection("user")
//         //     .doc(user.uid)
//         //     .create(JSON.parse(JSON.stringify(user)))
//         // );
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });

export const register =  (email, password) => async (dispatch) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    const ass = await firestore
      .collection("user")
      .doc(user.uid)
      .set(JSON.parse(JSON.stringify(user)));
      console.log('ass', ass);
  } catch (error) {
    console.log("error", error);
  }
};
