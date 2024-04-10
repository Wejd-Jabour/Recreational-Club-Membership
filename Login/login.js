// Firebase configuration
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


document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    CheckLogin(username, password);
  });

function CheckLogin(username, password) {
    var memberRef = db.ref('Member');

    memberRef.once('value')
        .then((snapshot) => {
            var members = snapshot.val();
            
            for (var memberKey in members) {
                if (members.hasOwnProperty(memberKey)) {
                    var user = members[memberKey].Username;
                    var pass = members[memberKey].Password;
                    var role = members[memberKey].Role;
                    var name = memberKey;
                    
                    if(user === username && pass === password) {
                        PageSwitch(role, name);
                        return; // Exit the loop once a match is found
                    }
                }
            }
            console.log("Invalid username or password");
        })
        .catch(error => console.error("Error checking login: ", error));
}

// Function to switch pages based on role
function PageSwitch(role) {
    console.log("Inside PageSwitch, role: ", role); // Add this line for debugging
    
    localStorage.setItem('username', username);
    localStorage.setItem('name', name);
    
    if (role === "Member") {
        console.log("Redirecting to memberHome.html"); // Add this line for debugging
        window.location.href = "../Member Page/memberHome.html";
    } else if (role === "Coach") {
        console.log("Redirecting to coach.html"); // Add this line for debugging
        window.location.href = "../Coach/coach.html";
    } else if (role === "Treasurer") {
        console.log("Redirecting to Treasurer's Page.html"); // Add this line for debugging
        window.location.href = "../Treasurer/Treasurer's Page.html";
    } else {
        console.log("Invalid role");
    }
}
