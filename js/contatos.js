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
            dados = '<table>' + '<tr><td id="td" onclick="gotochat(\'' + doc.data().uid + '\')">' +adicionado+ '</td></tr>' + dados;
            lista.innerHTML = dados;
        } else {
            usuarioLogado.innerHTML = 'Olá ' + doc.data().user
        }
    });
});

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

