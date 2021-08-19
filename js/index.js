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

const btnLoginEmail = document.getElementById("loginEmail_input");
const btnLoginPass = document.getElementById("loginPass_input");
const btnLoginEntrar = document.getElementById("loginEntrar_input");
const btnLogin = document.getElementById("login_input");

async function SingUp(){
    let email = document.getElementById("email_singUp").value;
    let senha = document.getElementById("senha_singUp").value;
    let usuario = document.getElementById("user").value;
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, senha).then((userCredential) => {
            new Promise(resolve => setTimeout(resolve, 3000));
            window.location.href = 'chat.html';
        })
    } catch (error) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                toast(`Endereço de e-mail já esta em uso !`)
                break;
            case 'auth/invalid-email':
                toast(`Endereço de e-mail é invalido !`)
                break;
            case 'auth/operation-not-allowed':
                toast(`Erro durante o cadastro !`)
                break;
            case 'auth/weak-password':
                toast(`Sua senha é fraca !`)
                break;
            default:
                console.log(error.message);
                break;
        }
    }
    firebase.auth().onAuthStateChanged( user => {
        if (user) { this.userId = user.uid }
        firebase.database().ref('users/' + user.uid).set({
            user: usuario,
            email: email
        });
    });
}
function Login(){
    btnLoginEmail.style.visibility = "visible";
    btnLoginPass.style.visibility = "visible";
    btnLoginEntrar.style.visibility = "visible";
    btnLogin.style.visibility = "hidden";
}
async function Entrar(){
    let email = document.getElementById("loginEmail_input").value;
    let senha = document.getElementById("loginPass_input").value;
    try{
        await firebase.auth().signInWithEmailAndPassword(email, senha).then((userCredential) => {
            new Promise(resolve => setTimeout(resolve, 3000));
            window.location.href = 'chat.html';
        })

    }catch (erro) {
        console.log(erro.code)
        switch (erro.code) {
            case 'auth/invalid-email':
                toast(`Endereço de e-mail é invalido !`)
                break;
            case 'auth/operation-not-allowed':
                toast(`Erro durante o cadastro !`)
                break;
            case 'auth/wrong-password':
                toast('Senha incorreta.')
                break;
        }
    }
}


function toast(mensagem) {
    var x = document.getElementById("erro");
    x.className = "show";
    x.innerHTML = mensagem;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}