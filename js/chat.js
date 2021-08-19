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


const userchat = document.getElementById("userChat");
const profile = document.getElementById("profile");
var docRef = db.collection("users").doc(sessionStorage.getItem('uid'));
docRef.get().then((doc) => {
    if (doc.exists) {
        userchat.innerHTML = doc.data().user
        profile.src = doc.data().img
        console.log(doc.user.img)
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
let userLogin = '';
const usuarioLogado = document.getElementById("user");

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.userId = user.uid
    }
   userLogin = user.uid;
    showMsg()
})

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (userLogin === doc.data().uid){
            usuarioLogado.innerHTML = 'Olá ' + doc.data().user;
        }
    });
});


var x = document.getElementById("myInput");
x.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("enviar").click();
        x.value = '';
    }
});

function enviar() {
    writeUserData(x.value)
}

function writeUserData(msg) {
    +new Date
    var smg = db.collection("mensagens");
    smg.doc().set({
        mensagem: msg,
        uid_sender: userLogin,
        uid_target: sessionStorage.getItem('uid'),
        time: Date.now()

    }).then((docRef) => {
        console.log("mensagem enviada");
        showMsg()
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
    });
}

let dados = '';
const lista = document.getElementById("conversas");

function showMsg() {
    var mensagens = db.collection("mensagens");
    mensagens.orderBy('time', 'desc').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().uid_sender === userLogin && doc.data().uid_target === sessionStorage.getItem('uid')){
                    dados = '<table>' + '<tr><td id="td_right">' + doc.data().mensagem + '</td></tr>' + dados;
            }if (doc.data().uid_sender === sessionStorage.getItem('uid') && doc.data().uid_target === userLogin) {
                    dados = '<table>' + '<tr><td id="td_left" style="color: red;float: left">' + doc.data().mensagem + '</td></tr>' + dados;
            }
            lista.innerHTML = dados;

        });
        dados = '';
    });
    setTimeout(showMsg, 10000);
}
function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.log(error.code)
    });
}