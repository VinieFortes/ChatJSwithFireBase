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

/*const firebaseConfig = {
    apiKey: "AIzaSyBvO2RRLLkFJLh6XBdeFCpSUvpv9pqg5cg",
    authDomain: "webb-760df.firebaseapp.com",
    projectId: "webb-760df",
    storageBucket: "webb-760df.appspot.com",
    messagingSenderId: "136311480133",
    appId: "1:136311480133:web:54d964ef1a662f98dca82c",
    measurementId: "G-2JZB4KMM4J"
};*/

//Incialização do firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Elementos
var imgs = ['src/cavalo.png','src/dog.png','src/dog2.png','src/gato.png','src/gato2.png','src/pinguim.png','src/passaro.png']
const btnLoginEmail = document.getElementById("loginEmail_input");
const btnLoginPass = document.getElementById("loginPass_input");
const btnLoginEntrar = document.getElementById("loginEntrar_input");
const btnLogin = document.getElementById("login_input");
const inputlin1 = document.getElementById("loginEmail_input");
const inputlin2 = document.getElementById("loginPass_input");

//Responsavel por atualizar o status online do usuario Sender
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        db.collection("users").doc(user.uid).update({
            online: 1
        }).then((docRef) => {
            window.location.href = 'contatos.html';
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
})

// Função para cadastro
async function SingUp(){
    let email = document.getElementById("email_singUp").value;
    let senha = document.getElementById("senha_singUp").value;
    let usuario = document.getElementById("user").value;
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, senha).then(async (userCredential) => {

            await firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.userId = user.uid
                }
                db.collection("users").doc(user.uid).set({
                    user: usuario,
                    email: email,
                    uid: user.uid,
                    img: imgs[Math.floor(Math.random() * 6) + 1],
                    online: 1
                }).then((docRef) => {
                    window.location.href = 'contatos.html';
                })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });

            });

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
}

//Função revelar a tela do Login
function Login(){
    btnLoginEmail.style.visibility = "visible";
    btnLoginPass.style.visibility = "visible";
    btnLoginEntrar.style.visibility = "visible";
    btnLogin.style.visibility = "hidden";
}

//Função responsavel para Entrar na conta
async function Entrar(){
    let email = document.getElementById("loginEmail_input").value;
    let senha = document.getElementById("loginPass_input").value;
    try{
        await firebase.auth().signInWithEmailAndPassword(email, senha).then((userCredential) => {
            new Promise(resolve => setTimeout(resolve, 3000));
            db.collection("users").doc(user.uid).update({
                online: 1
            }).then((docRef) => {
                    window.location.href = 'contatos.html';
            })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
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

inputlin2.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("loginEntrar_input").click();
    }
});

function toast(mensagem) {
    var x = document.getElementById("erro");
    x.className = "show";
    x.innerHTML = mensagem;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}