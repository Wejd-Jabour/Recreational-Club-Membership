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




//Calendar Section Settings

let currentYear;
let currentMonth;


function addMessage(username, message) {

        var ref = db.ref("Member/" + username + "/Message");
        // Create a new message entry with a unique key
        var newMessageRef = ref.push();
       // console.log(username);
        // Set the message content
        console.log(username);

        newMessageRef.set({
            text: message,
        }).then((message) => {
            console.log("IN addMessage");
            console.log(message);
            resolve("added message"); // Resolve after .set() completes
        }).catch((error) => {
            reject("failed to add message: " + error.message); // Reject in case of an error
        });
}

// function addMessage(name,message) {

//     var ref = db.ref("Member/" + name);
//     ref.update({
//         Message: message
//     });
//   }

// function generateCalendar(year, month) {
//     const calendarDiv = document.getElementById('calendar');
    
//     // Clear previous calendar
//     calendarDiv.innerHTML = '';
    
//     // Create a new date object
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
    
//     // Create table element
//     const table = document.createElement('table');
    
//     // Create table header
//     const thead = document.createElement('thead');
//     const headerRow = document.createElement('tr');
//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     daysOfWeek.forEach(day => {
//         const th = document.createElement('th');
//         th.textContent = day;
//         headerRow.appendChild(th);
//     });
//     thead.appendChild(headerRow);
//     table.appendChild(thead);
    
//     // Create table body
//     const tbody = document.createElement('tbody');
    
//     let currentDate = new Date(firstDay);
//     let currentDateIndex = 0;
    
//     while (currentDate <= lastDay) {
//         const newRow = document.createElement('tr');
//         for (let i = 0; i < 7; i++) {
//             const cell = document.createElement('td');
//             if (currentDateIndex >= firstDay.getDay() && currentDate.getMonth() === month) {
//                 cell.textContent = currentDate.getDate();
//                 currentDate.setDate(currentDate.getDate() + 1);
//             }
//             newRow.appendChild(cell);
//             currentDateIndex++;
//         }
//         tbody.appendChild(newRow);
//     }
    
//     table.appendChild(tbody);
//     calendarDiv.appendChild(table);
// }

function generateCalendar(year, month) {
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = ''; // Clear previous calendar

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create table header
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    let currentDate = new Date(firstDay);
    let currentDateIndex = 0;

    while (currentDate <= lastDay) {
        const newRow = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const cell = document.createElement('td');
            
            const dayStr = ("0" + currentDate.getDate()).slice(-2); // Ensures two-digit format
            const cellList = document.createElement('ul');
            cellList.id = `attending-${dayStr}`; // Unique ID for each <ul> based on the day

            if (currentDateIndex >= firstDay.getDay() && currentDate.getMonth() === month) {
                cell.textContent = currentDate.getDate();
                // const dateItem = document.createElement('li');
                // cellList.appendChild(dateItem); // Append date item to the list
                currentDate.setDate(currentDate.getDate() + 1);
            }
            cell.appendChild(cellList); // Append the list to the cell
            newRow.appendChild(cell);
            currentDateIndex++;
        }
        tbody.appendChild(newRow);
    }

    table.appendChild(tbody);
    calendarDiv.appendChild(table);
}


// function addMembertoCal(event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     // Get the username and date input values
//     const usernameInput = document.getElementById('username').value;
//     const dateInput = document.getElementById('dateInput').value;
//     const selectedDate = new Date(dateInput);
//     const day = selectedDate.getDate();

//     // Get the <ul> element with the appropriate ID
//     const ul = document.getElementById(`attending-${day}`);
    
//     if (ul) { // Check if the <ul> element exists
//         // Create a new <li> element
//         const li = document.createElement('li');
//         li.textContent = usernameInput;
        
//         // Append the <li> element to the <ul> element
//         ul.appendChild(li);
//     } else {
//         console.error(`UL element with ID "attending-${day}" not found.`);
//     }
// }


function addMembertoCal(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value; // Username
    const dateInput = document.getElementById('cal-prac-picker').value; // Date input value

    if (dateInput) {
        const date = new Date(dateInput);
        const dayStr = ("0" + date.getDate()+1).slice(-2); // Ensures two-digit format
        const ulId = `attending-${dayStr}`;
        const ul = document.getElementById(ulId);

        if (ul) {
            const li = document.createElement('li');
            li.textContent = username; // Set username as list item content
            ul.appendChild(li); // Append the new <li> to the <ul>
        } 
    } else {
        alert("Please select a date.");
    }
}



function onPageLoad() {
    // Get current year and month
    const now = new Date();
    currentYear = now.getFullYear();
    currentMonth = now.getMonth();
    generateCalendar(currentYear, currentMonth);
    
}

// Attach event listener to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', onPageLoad);


function nextMonth() {
    if (currentMonth === 11) {
        currentYear++;
        currentMonth = 0;
    } else {
        currentMonth++;
    }
    generateCalendar(currentYear, currentMonth);
}


function previousMonth() {
    if (currentMonth === 0) {
        currentYear--;
        currentMonth = 11;
    } else {
        currentMonth--;
    }
    generateCalendar(currentYear, currentMonth);
}

function revealCalendar() {
    document.getElementById("Income Section").style.display = "none";
    document.getElementById("Expense Section").style.display = "none";
    document.getElementById("CalendarSection").style.display = "block";
}

async function sendMessages(usernames, message)
{
    console.log(usernames);
    for (var i = 0; i < usernames.length; i++) {
        var username = usernames[i];
        var ref = db.ref("Member/" + username + "/Message");

        // Create a new message entry with a unique key
        var newMessageRef = ref.push();
       // console.log(username);
        // Set the message content
        console.log(username);

        newMessageRef.set({
            text: message,
        }).then((message) => {
            console.log("IN addMessage");
            console.log(message);
            resolve("added message"); // Resolve after .set() completes
        }).catch((error) => {
            reject("failed to add message: " + error.message); // Reject in case of an error
        });
        console.log(username);
        }
}

function storeInput() { // usernames are actually names!

    // Step 1: Get a reference to the input element
    var usernameElement = document.getElementById('usernamesInput');
    var messageElement = document.getElementById('messageInput');
    // Step 2: Retrieve the value entered by the user
    var usernameInput = usernameElement.value;
    var messageInput = messageElement.value;
    // Step 3: Store the value as needed
    // For example, you can store it in a variable
    //var storedValue = usernameInput;


    var usernamesArray = usernameInput.split(',');

// Trim whitespace from each username and create a new array
    var cleanedUsernames = usernamesArray.map(function(username) {
    return username.trim();
    });
    sendMessages(cleanedUsernames, messageInput);
}

function sendReminder(){
    // Step 1: Get a reference to the input element
    var usernameElement = document.getElementById('reminderInput');
    var messageInput = "REMINDER TO PAY FOR YOUR SESSION!";
    // Step 2: Retrieve the value entered by the user
    var usernameInput = usernameElement.value;
    // Step 3: Store the value as needed
    // For example, you can store it in a variable
    //var storedValue = usernameInput;

    var usernamesArray = usernameInput.split(',');

    // Trim whitespace from each username and create a new array
    var cleanedUsernames = usernamesArray.map(function(username) {
    return username.trim();
    });
    return sendMessages(cleanedUsernames, messageInput);
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



const dbRef = firebase.database().ref();
    
dbRef.child('Member').once('value', (snapshot) => {
    const members = snapshot.val();
    console.log(members);


    for (let memberKey in members) {
        
        const practicesUl = document.getElementById('memberList');
        
        let li = document.createElement('li');
        li.textContent = memberKey; // Assuming the date is the key
        practicesUl.appendChild(li);
        
    };

}).catch(error => console.error("Error fetching member data: ", error));
