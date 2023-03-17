
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

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


function generateTemplate(response,id){
    return `<div class="card">
                <p class="title">${response.title}</p>
                <div class="subInformation">
                    <p>
                        <span class="category ${response.category}">${response.category[0].toUpperCase()}${response.category.slice(1)} </span>
                    </p>
                    <a href="${response.link}" target="_blank"><i class="bi bi-box-arrow-up-right website"></i></a>
                    <a href="https://www.google.com/search?q=${response.title}" target="_blank"><i class="bi bi-google search"></i></a>
                    <span><i class="bi bi-trash delete" data-id="${response.id}"></i></span>
                </div>
            </div>`;
}

const cards=document.querySelector(".cards");
function showCard(){
    cards.innerHTML="";
    getDocs(colRef)
        .then((data)=>{
            data.docs.forEach(document =>{
                cards.innerHTML+= generateTemplate(document.data(),document.id);
            })
        })
        .catch((error)=>{
            console.log(error);
        })
}
showCard();

const addForm=document.querySelector(".add");
addForm.addEventListener("submit", event =>{
    event.preventDefault();
    addDoc(colRef,{
        link: addForm.link.value,
        title: addForm.title.value,
        category: addForm.category.value,
        createdAt: serverTimestamp()
    }).then(()=>{
        showCard();
        addForm.reset();
    });
});