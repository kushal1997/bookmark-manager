
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc, orderBy, query, where, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

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
                    <span><i class="bi bi-trash delete" data-id="${id}"></i></span>
                </div>
            </div>`;
}

function deleteEvent(){
    const deleteButtons = document.querySelectorAll("i.delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", event => {
            const deleteRef = doc(db, "bookmarks", button.dataset.id);
            deleteDoc(deleteRef)
                .then(() => {
                    button.parentElement.parentElement.parentElement.remove();
                })
        })
    });
}

const cards=document.querySelector(".cards");
function showCard(){
    cards.innerHTML="";
    const qRef=query(colRef,orderBy("createdAt") );
    getDocs(qRef)
        .then((data)=>{
            data.docs.forEach(document =>{
                cards.innerHTML+= generateTemplate(document.data(),document.id);
            });
            deleteEvent();
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

function filteredCards(category){
    if(category==='All'){
        showCard();
    }else{
        const qryRef =query(colRef, where("category","==",category.toLowerCase()), orderBy("createdAt"));
        cards.innerHTML="";
        getDocs(qryRef)
            .then(data => {
                data.docs.forEach(doc=>{
                    cards.innerHTML+=generateTemplate(doc.data(),doc.id);
                })
                
                deleteEvent();
            })
            .catch(error =>{
                console.log(error);
            });
    }
        
}


const categoryList=document.querySelector(".categoryList");
const categorySpan=document.querySelectorAll(".categoryList span");
categoryList.addEventListener("click", event =>{
    if(event.target.tagName ==="SPAN"){
        filteredCards(event.target.innerText);
        categorySpan.forEach(span=>{
            span.classList.remove("active");
            event.target.classList.add("active");
        })
    }
});