function togglePopup() { 
    const overlay = document.getElementById('popupOverlay'); 
    overlay.classList.toggle('show'); 
} 


function addPractice() {
    var practiceDate = document.getElementById("cal-prac-picker").value;
    if (practiceDate == "") {
        alert("Please choose a date");
        return;
    }

    var repeatedDate = false;
    var currPracDates = Array.from(document.querySelectorAll('#practices-to-add>li'), (li) => {
        console.log(li.textContent);
        if (li.textContent.includes(practiceDate)) {
            alert("Repeated date attempted to add")
            repeatedDate = true;
            return;
        }
    });

    if (!repeatedDate) {
        var practiceList = document.getElementById("practices-to-add");
        var liElement = document.createElement('li');
        var liBtn = document.createElement('btn');
    
        liElement.textContent = practiceDate + " ";
        liBtn.id = "prac-rem-btn";
        liBtn.textContent = '×';
        liBtn.style.color = "white";
        liBtn.style.background = "red";
        liBtn.style.borderRadius = "5px";

        liBtn.onclick = removePractice;
        // liBtn.setAttribute('onclick', )

        liElement.appendChild(liBtn);
        practiceList.appendChild(liElement);
    }
    document.getElementById("cal-prac-picker").value = null;
    return;
}

function removePractice() {
    this.getElementById
    var parentElement = document.getElementById("myLI").parentElement.nodeName
    console.log("removed");
}


function addAllPractices() {


    // var listofPracticeDates = document.getElementById("practices-to-add");

    var datesToAdd = Array.from(document.querySelectorAll('#practices-to-add>li'), (li) => {
        console.log(li.textContent)
    });

    // console.log(listofPracticeDates);
    document.getElementById("cal-prac-picker").value = null;
    return;
}

window.onload = function() {
    
    const username = userTest;
    console.log(username);
    console.log("testqw");
    
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
    
    const dbRef = firebase.database().ref();
    
    dbRef.child('Member').once('value', (snapshot) => {
        const members = snapshot.val();
        console.log(members);


        for (let memberKey in members) {
            if (members.hasOwnProperty(memberKey)) {
                let user = members[memberKey].Username;
                let pass = members[memberKey].Password;
                let role = members[memberKey].Role;
                let name = memberKey;

                console.log(name);

                

                if (user === username) {
                    // Fetch and display practices
                    console.log(name);
                    dbRef.child('Member/' + name + '/Practices').once('value', (practicesSnapshot) => {
                        const practices = practicesSnapshot.val();
                        const practicesUl = document.getElementById('upcoming-practices');
                        practicesUl.innerHTML = ''; // Clear existing entries
                        for (let date in practices) {
                            let li = document.createElement('li');
                            li.textContent = date; // Assuming the date is the key
                            practicesUl.appendChild(li);
                        }
                    });
// Fetch and display messages
                    dbRef.child('Member/' + name + '/Message').once('value', (messagesSnapshot) => {
                        const messages = messagesSnapshot.val();
                        const messagesDiv = document.getElementById('messages');
                        messagesDiv.innerHTML = ''; // Clear existing entries
                        for (let message in messages) {
                            let p = document.createElement('p');
                            p.textContent = messages[message]; // Assuming the message itself is the value
                            messagesDiv.appendChild(p);
                        }
                    });

                    break; // Exit the loop once the matching user is processed
                }
            }
        }
    }).catch(error => console.error("Error fetching member data: ", error));
};




// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const db = firebase.database();

// document.getElementById('book-practice').addEventListener('addPrac', function(event) {
//     event.preventDefault(); 
//     var date = document.getElementById('cal-prac-picker').value;

//     pracUpdater(date);
//   });

//   function pracUpdater(date) {

//   }