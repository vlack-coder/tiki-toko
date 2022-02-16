import { saveMediaToStorage } from "./random";
import firebase from "firebase";
import { auth } from "../../App";
import { firestore } from "../../App";

export const saveUserProfileImage = (image) =>
  new Promise((resolve, reject) => {
    saveMediaToStorage(image, `profileImage/${auth.currentUser.uid}`).then(
      (res) => {
        firestore
          .collection("user")
          .doc(auth.currentUser.uid)
          .update({
            photoURL: res,
          })
          .then(() => resolve())
          .catch(() => reject());
      }
    );
  });

export const saveUserField = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firestore
      .collection("user")
      .doc(auth.currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const queryUsersByEmail = (email) =>
  new Promise((resolve, reject) => {
    if (email === "") {
      resolve([]);
    }

    firestore
      .collection("user")
      .where("email", ">=", email)
      .where("email", "<=", email + "\uf8ff")
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        resolve(users);
      })
      .catch(() => reject());
  });

/**
 * fetches the doc corresponding to the id of a user.
 *
 * @param {String} id of the user we want to fetch
 * @returns {Promise<Object>} user object if successful.
 */
export const getUserById = (id) =>
  new Promise((resolve, reject) => {
    firestore
      .collection("user")
      .doc(id)
      .get()
      .then((snapshot) => {
        resolve(snapshot.exists ? snapshot.data() : null);
      })
      .catch(() => reject());
  });
