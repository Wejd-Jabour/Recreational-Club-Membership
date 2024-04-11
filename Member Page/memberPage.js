function togglePopup() { 
    const overlay = document.getElementById('popupOverlay'); 
    overlay.classList.toggle('show'); 
} 

var DATES = [];
var DBS = [];

function addPractice() {
    var practiceDate = document.getElementById("cal-prac-picker").value;
    if (practiceDate == "") {
        alert("Please choose a date");
        return;
    }
    DATES.push(practiceDate);
    //console.log(practiceDate);
    var repeatedDate = false;
    var currPracDates = Array.from(document.querySelectorAll('#practices-to-add>li'), (li) => {
        console.log(li.textContent);
        if (li.textContent.includes(practiceDate)) {
            alert("Repeated date attempted to add")
            repeatedDate = true;
            return;
        }
    });
    console.log(currPracDates);
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
    //console.log(DATES);
    document.getElementById("cal-prac-picker").value = null;
    return;
}

function removePractice() {
    this.getElementById
    var parentElement = document.getElementById("myLI").parentElement.nodeName
    console.log("removed");
}


function addAllPractices() {
    //event.preventDefault();


    var listofPracticeDates = document.getElementById("practices-to-add");
    var practDates = listofPracticeDates.value;
    console.log(DATES);
    // var datesToAdd = Array.from(document.querySelectorAll('#practices-to-add>li'), (li) => {
    //     console.log(li.textContent)
    // });
    var str = "";
    for (var i = 0; i < DATES.length; i++)
    {
        pracUpdater(DATES);
    }
    console.log(str);
    
    // console.log(listofPracticeDates);
    // var date = document.getElementById('practices-to-add').value;
    // console.log(date);
    // pracUpdater(date);



    document.getElementById("cal-prac-picker").value = null;
    return;
}

function pracUpdater(date) {
    db = DBS[0];
    console.log(globName);
    var ref = db.ref("Member/" + globName + "/Practices");
        // Create a new message entry with a unique key
        var newMessageRef = ref.push();
       // console.log(username);
        // Set the message content
        console.log(date);

        newMessageRef.set({
            practice: date,
        });

   location.reload();

  }


var globName;

window.onload = function() {
    
    
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
    DBS.push(db);
    var user;

    var starCountRef = db.ref('Current/Username');
        starCountRef.on('value', (snapshot) => {
        user = snapshot.val();
});
    
    const dbRef = firebase.database().ref();
    
    dbRef.child('Member').once('value', (snapshot) => {
        const members = snapshot.val();
        console.log(members);


        for (let memberKey in members) {
            if (members.hasOwnProperty(memberKey)) {
                let username = members[memberKey].Username;
                let pass = members[memberKey].Password;
                let role = members[memberKey].Role;
                let name = memberKey;

                console.log(name);

                

                if (username === user) {
                    // Fetch and display practices
                    console.log(name);
                    globName = name;
                    console.log(globName);
                    dbRef.child('Member/' + name + '/Practices').once('value', (practiceSnapshot) => {
                        const practices = practiceSnapshot.val();
                        const ul = document.getElementById("prac12")
                        for (let prac in practices) {
                            const date = practices[prac].practice;
                            const li = document.createElement('li');
                            li.textContent = date; // Set username as list item content
                            ul.appendChild(li); // Append the new <li> to the <ul>
                        }
                    });
// Fetch and display messages
                    dbRef.child('Member/' + name + '/Message').once('value', (messagesSnapshot) => {
                        const messages = messagesSnapshot.val();
                        const ul = document.getElementById("messages")
                        for (let message in messages) {
                            const messageText = messages[message].text;
                            const li = document.createElement('li');
                            li.textContent = messageText; // Set username as list item content
                            ul.appendChild(li); // Append the new <li> to the <ul>
                        }
                    });

                    break; // Exit the loop once the matching user is processed
                }
            }
        }
    }).catch(error => console.error("Error fetching member data: ", error));
};





document.getElementById('book-practice').addEventListener('addPrac', function(event) {
    event.preventDefault(); 
    
    var date = document.getElementById('practices-to-add').value;
    console.log(date);
    pracUpdater(date);
  });
