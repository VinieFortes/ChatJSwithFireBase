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
const status = document.getElementById("status");
const userchat = document.getElementById("userChat");
const profile = document.getElementById("profile");
const lista = document.getElementById("conversas");
const usuarioLogado = document.getElementById("user");

// Responsavel por ler o BD do usuario Target
const docRef = db.collection("users").doc(sessionStorage.getItem('uid'));
docRef.get().then((doc) => {
    if (doc.exists) {
        userchat.innerHTML = doc.data().user
        profile.src = doc.data().img
        console.log(doc.data().online)
        switch (doc.data().online){
            case 1:
                status.innerHTML = 'online'
                break;
            case 0:
                status.innerHTML = 'offline'
                break;
        }
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

// Verifica se o usuario Sender está logado e chama a função de monstar as msgs
let userLogin = '';
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.userId = user.uid
    }
    userLogin = user.uid;
    showMsg()
})

// Ler as informações do usuario Sender
db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (userLogin === doc.data().uid){
            usuarioLogado.innerHTML = 'Olá ' + doc.data().user;
        }
    });
});

//Responsavel por da input apertando botão Enter
const x = document.getElementById("myInput");
x.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("enviar").click();
        x.value = '';
    }
});

//Função que liga botão enviar a função que escreve a msg no BD
function enviar() {
    if (x.value.length === 0){
        window.alert("Escreva uma mensagem !");
    } else {
        writeMensagem(x.value)
    }
}

//Função responsavel por escrever no BD
function writeMensagem(msg) {
    x.value = '';
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

//Função responsavel por mostrar as mensagens
function showMsg() {
    const mensagens = db.collection("mensagens");
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