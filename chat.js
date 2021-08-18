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
showdb()
var x = document.getElementById("myInput");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var user_uid = user.uid
    }

    firebase.database().ref().child("users").child(user_uid).get().then((snapshot) => {
        if (snapshot.exists()) {
            var user = document.getElementById("user");
            user.innerHTML = snapshot.val().user;
        }
    })
})

    function setto() {
        writeUserData(1, x.value)
        showdb()
    }

    function writeUserData(userId, msg) {
        firebase.database().ref('users/' + userId).set({
            msg: msg
        });
    }

    function showdb() {
        const para = document.createElement("p");
        const dbRef = firebase.database().ref();
        dbRef.child("users").child(1).get().then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val().msg)
                const node = document.createTextNode(snapshot.val().msg);
                para.appendChild(node);
                const element = document.getElementById("div1");
                element.appendChild(para);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
}

