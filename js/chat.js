var firebaseConfig = {
    apiKey: "AIzaSyBf_gsA_VIIxMFG6OLYwIB9f0RCDdgpjXg",
    authDomain: "fir-projectjs.firebaseapp.com",
    projectId: "fir-projectjs",
    storageBucket: "fir-projectjs.appspot.com",
    messagingSenderId: "460409099476",
    appId: "1:460409099476:web:a02f2a1709461618b99741",
    databaseURL: "https://fir-projectjs-default-rtdb.firebaseio.com/",
    measurementId: "G-KWQJ6QN6GF",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const userchat = document.getElementById("userChat");
var docRef = db.collection("users").doc(sessionStorage.getItem('uid'));
docRef.get().then((doc) => {
    if (doc.exists) {
        userchat.innerHTML = doc.data().user
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
    showdb()
})

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (userLogin === doc.data().uid){
            usuarioLogado.innerHTML = 'Olá ' + doc.data().user;
        }
    });
});


var x = document.getElementById("myInput");

function enviar() {
    writeUserData(x.value)
}

function writeUserData(msg) {
    db.collection("mensagens").doc().set({
        mensagem: msg,
        uid_sender: userLogin,
        uid_target: sessionStorage.getItem('uid')

    }).then((docRef) => {
        console.log("mensagem enviada");
        showdb()
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
    });
}

let dados = '';
const lista = document.getElementById("conversas");

function showdb() {
    db.collection("mensagens").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().uid_sender === userLogin){
                dados = '<table>' + '<tr><td id="td" style="color: blue">' +doc.data().mensagem+ '</td></tr>' + dados;
            } else {
                dados = '<table>' + '<tr><td id="td" style="color: red">' +doc.data().mensagem+ '</td></tr>' + dados;
            }
            lista.innerHTML = dados;

        });
        dados = '';
    });

    setTimeout(showdb, 1000);
}


