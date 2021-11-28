import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6DlJVAmbZDn9eR63S3jcVmuMv0BRRFdI",
  authDomain: "codecamp-04-preview.firebaseapp.com",
  projectId: "codecamp-04-preview",
  storageBucket: "codecamp-04-preview.appspot.com",
  messagingSenderId: "336275170750",
  appId: "1:336275170750:web:6a99cbcff5ba36157785ef",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default function FirebasePage() {
  async function onClickSubmit() {
    const board = collection(getFirestore(firebaseApp), "board");
    await addDoc(board, {
      writer: "철수",
      title: "제목입니다",
      contents: "내용입니다~",
    });
  }

  async function onClickFetch() {
    const board = collection(getFirestore(firebaseApp), "board");
    const result = await getDocs(board);
    const docs = result.docs.map((el) => el.data());
    console.log(docs);
  }

  return (
    <>
      <div>파이어베이스 페이지입니다</div>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>불러오기</button>
    </>
  );
}
