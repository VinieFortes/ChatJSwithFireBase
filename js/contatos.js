/*var firebaseConfig = {
    apiKey: "AIzaSyBf_gsA_VIIxMFG6OLYwIB9f0RCDdgpjXg",
    authDomain: "fir-projectjs.firebaseapp.com",
    projectId: "fir-projectjs",
    storageBucket: "fir-projectjs.appspot.com",
    messagingSenderId: "460409099476",
    appId: "1:460409099476:web:a02f2a1709461618b99741",
    databaseURL: "https://fir-projectjs-default-rtdb.firebaseio.com/",
    measurementId: "G-KWQJ6QN6GF",
};*/
var firebaseConfig = {
    apiKey: "AIzaSyBvO2RRLLkFJLh6XBdeFCpSUvpv9pqg5cg",
    authDomain: "webb-760df.firebaseapp.com",
    projectId: "webb-760df",
    storageBucket: "webb-760df.appspot.com",
    messagingSenderId: "136311480133",
    appId: "1:136311480133:web:54d964ef1a662f98dca82c",
    measurementId: "G-2JZB4KMM4J"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const usuarioLogado = document.getElementById("user");
const lista = document.getElementById("lista");
var dados = '';
var userLogin = '';

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.userId = user.uid
    }
    userLogin = user.uid;
})

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (userLogin !== doc.data().uid){
            var adicionado = doc.data().user;
            dados = '<table>' + '<tr><td><img src=\'' + doc.data().img + '\' style="border-radius: 50%" width="32" height="32" alt="profile"></td><td id="td" onclick="gotochat(\'' + doc.data().uid + '\')">' +adicionado+ '</td></tr>' + dados;
            lista.innerHTML = dados;
        } else {
            usuarioLogado.innerHTML = 'Olá ' + doc.data().user
        }
    });
});

function chat_global(){
    window.location.href = 'chat_global.html';
}

function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.log(error.code)
    });
}


function gotochat(uid) {
    sessionStorage.setItem('uid', uid);
    window.location.href = 'chat.html';

}

