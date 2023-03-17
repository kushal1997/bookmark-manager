
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD5It1IQXxZT57QNzF9_A1wphQbLY6L9Cw",
    authDomain: "bookmark-manager-257aa.firebaseapp.com",
    projectId: "bookmark-manager-257aa",
    storageBucket: "bookmark-manager-257aa.appspot.com",
    messagingSenderId: "221351639711",
    appId: "1:221351639711:web:b463bed6415d89be9680aa"
};

const app = initializeApp(firebaseConfig);
const db=getFirestore();
const colRef=collection(db,"bookmarks");

const addForm=document.querySelector(".add");
addForm.addEventListener("submit", event =>{
    event.preventDefault();
    addDoc(colRef,{
        link: addForm.link.value,
        title: addForm.title.value,
        category: addForm.category.value,
        createdAt: serverTimestamp()
    }).then(()=>{
        addForm.reset();
    });
});
