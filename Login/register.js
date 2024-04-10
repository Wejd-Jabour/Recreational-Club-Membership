
const firebaseConfig = {

    measurementId: "G-NB2W85MSVY",
    apiKey: "AIzaSyAip6F4bVauBOy-O-w2Fr-nDAng_Z7ZMHQ",
    authDomain: "iteration3-e3d7f.firebaseapp.com",
    databaseURL: "https://iteration3-e3d7f-default-rtdb.firebaseio.com/",
    projectId: "iteration3-e3d7f",
    storageBucket: "iteration3-e3d7f.appspot.com",
    messagingSenderId: "669362709701",
    appId: "1:669362709701:web:daea737d76afc30d967cac",
    measurementId: "G-YYTV94XHX6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var dob = document.getElementById('dob').value;
    var role = document.getElementById('role').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;



    AddNewUser(name, email, dob, role, username, password)
        .then(() => PageSwitch(role))
        .catch(error => console.error("Error adding user: ", error));
  });

  function PageSwitch(role) {
    console.log("Inside PageSwitch, role: ", role); // Add this line for debugging
    if (role === "Member") {
        console.log("Redirecting to memberHome.html"); // Add this line for debugging
        window.location.href = "../Member Page/memberHome.html";
    }
    if (role === "Coach") {
        console.log("Redirecting to coach.html"); // Add this line for debugging
        window.location.href = "../Coach/coach.html";
    }
    if (role === "Treasurer") {
        console.log("Redirecting to Treasurer's Page.html"); // Add this line for debugging
        window.location.href = "../Treasurer/Treasurer's Page.html";
    }
}


function AddNewUser(name, email, dob, role, username, password) {
    return new Promise((resolve, reject) => {
        db.ref('Member/' + name).set({
            Email: email,
            Username: username,
            Password: password,
            Role: role,
            Date_of_Birth: dob,
            Payments_Total: 0.00,
            Message: ""
        })
        .then(() => {
            resolve(); // Resolve the promise when the data is successfully written
        })
        .catch(error => {
            reject(error); // Reject the promise if an error occurs
        });
    });
}