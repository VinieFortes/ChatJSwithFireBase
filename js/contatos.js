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

const firebaseConfig = {
    apiKey: "AIzaSyBvO2RRLLkFJLh6XBdeFCpSUvpv9pqg5cg",
    authDomain: "webb-760df.firebaseapp.com",
    projectId: "webb-760df",
    storageBucket: "webb-760df.appspot.com",
    messagingSenderId: "136311480133",
    appId: "1:136311480133:web:54d964ef1a662f98dca82c",
    measurementId: "G-2JZB4KMM4J"
};

//Incialização do firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Elementos
const usuarioLogado = document.getElementById("user");
const lista = document.getElementById("lista");
let dados = '';
let userLogin = '';

//Verifica se o usuario Sender está logado
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.userId = user.uid
    }
     userLogin = user.uid;
})

//Ler o BD e lista todos os usuarios cadastrados
db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (userLogin !== doc.data().uid){
            var adicionado = doc.data().user;
            dados = '<table>' + '<tr><td><img src=\'' + doc.data().img + '\' style="border-radius: 50%" width="32" height="32" alt="profile"></td><td id="td" onclick="gotochat(\'' + doc.data().uid + '\')">' +adicionado+ '</td>' + dados;
            lista.innerHTML = dados;
        } else {
            usuarioLogado.innerHTML = 'Olá ' + doc.data().user
        }
    });
});

// Função leva para chat global
function chat_global(){
    window.location.href = 'chat_global.html';
}

// Função leva para chat individual passando o uid do user Target
function gotochat(uid) {
    sessionStorage.setItem('uid', uid);
    window.location.href = 'chat.html';
}

//Função responsavel por fazer LogOut
function logout(){
    db.collection("users").doc(userLogin).update({
        online: 0
    }).then((docRef) => {
        firebase.auth().signOut().then(() => {
            window.location.href = 'index.html';
        }).catch((error) => {
            console.log(error.code)
        });
        window.location.href = 'index.html';
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}
