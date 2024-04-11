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

let TotalEarnings = 0; // Variable to store total income

window.onload = function() {
    

    const dbRef = firebase.database().ref();
    
    dbRef.child('Member').once('value', (snapshot) => {
        const members = snapshot.val();
        console.log(members);


        for (let memberKey in members) {
           
            let payment = members[memberKey].Payments_Total;
            console.log(payment + "+" + TotalEarnings);
            
            TotalEarnings += payment;
            
            console.log(TotalEarnings);

            
        }
        // document.getElementById("progress-text").textContent = "$" + TotalEarnings.toFixed(2);
    
        // updateProgress(TotalEarnings);

        updatevalIncomeonLoad(TotalEarnings);
    })
    }
    


function updateProgress(value) {
const circle = document.getElementById('progress-circle');
const circumference = parseFloat(circle.getAttribute('r')) * 2 * Math.PI;
const offset = circumference - (value / 100) * circumference;
circle.style.strokeDashoffset = offset;
}

function updatevalIncome() {
let value = parseFloat(document.getElementById("Income Value").value);
if (isNaN(value)) return; // Check if input is valid number
TotalEarnings += value; // Add new income to total
document.getElementById("progress-text").textContent = "$" + TotalEarnings.toFixed(2); // Display total income

let percentage = (TotalEarnings / 10000) * 100; // Calculate percentage for progress bar
if (TotalEarnings > 10000) {
    updateProgress(100); // Set progress to 100%
} else {
    let percentage = (TotalEarnings / 10000) * 100; // Calculate percentage for progress bar
    updateProgress(percentage); // Update progress bar
}
document.getElementById("Income Value").value = ""; // Clear input field
document.getElementById("Income Reason").value = ""; // Clear reason field
}


function updatevalIncomeonLoad(currPay) {
let value = currPay;
if (isNaN(value)) return; // Check if input is valid number
 // Add new income to total
document.getElementById("progress-text").textContent = "$" + value.toFixed(2); // Display total income

let percentage = (value / 10000) * 100; // Calculate percentage for progress bar
if (value > 10000) {
    updateProgress(100); // Set progress to 100%
} else {
    let percentage = (value / 10000) * 100; // Calculate percentage for progress bar
    updateProgress(percentage); // Update progress bar
}
document.getElementById("Income Value").value = ""; // Clear input field
document.getElementById("Income Reason").value = ""; // Clear reason field
}


function updatevalExpense() {
let value = parseFloat(document.getElementById("Expense Value").value);
if (isNaN(value)) return; // Check if input is valid number
TotalEarnings -= value; // Add new Expense to total
document.getElementById("progress-text").textContent = "$" + TotalEarnings.toFixed(2); // Display total Expense

let percentage = (TotalEarnings / 10000) * 100; // Calculate percentage for progress bar
if (TotalEarnings > 10000) {
    updateProgress(100); // Set progress to 100%
} else {
    let percentage = (TotalEarnings / 10000) * 100; // Calculate percentage for progress bar
    updateProgress(percentage); // Update progress bar
}
document.getElementById("Expense Value").value = ""; // Clear input field
document.getElementById("Expense Reason").value = ""; // Clear reason field
}


//Calendar Section Settings


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



function addMembertoCal(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value; // Username
    const dateInput = document.getElementById('cal-prac-picker').value; // Date input value

    if (dateInput) {
        let date = new Date(dateInput);

        // Adjust for timezone offset to ensure we're working with the correct date
        const timeZoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
        date = new Date(date.getTime() + timeZoneOffset);
        const dayStr = ("0" + date.getDate()).slice(-2); // Ensures two-digit format, correctly forming the day string
        const ulId = `attending-${dayStr}`;
        const ul = document.getElementById(ulId);

        if (ul) {
            const li = document.createElement('li');
            li.textContent = username; // Set username as list item content
            ul.appendChild(li); // Append the new <li> to the <ul>
        } else {
            console.error(`UL with id ${ulId} not found.`);
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


function revealIncome() {
    document.getElementById("Income Section").style.display = "block";
    document.getElementById("Expense Section").style.display = "none";
    document.getElementById("CalendarSection").style.display = "none";
}

function revealExpense() {
    document.getElementById("Income Section").style.display = "none";
    document.getElementById("Expense Section").style.display = "block";
    document.getElementById("CalendarSection").style.display = "none";
}

function revealCalendar() {
    document.getElementById("Income Section").style.display = "none";
    document.getElementById("Expense Section").style.display = "none";
    document.getElementById("CalendarSection").style.display = "block";
}





const db = firebase.database();


const dbRef = firebase.database().ref();
    
dbRef.child('Member').once('value', (snapshot) => {
    const members = snapshot.val();
    console.log(members);


    for (let memberKey in members) {
        
        const practicesUl = document.getElementById('coachList');
        
        if(members[memberKey].Role == "Coach"){
            let li = document.createElement('li');
            li.textContent = memberKey; // Assuming the date is the key
            practicesUl.appendChild(li);
        }
        
    };

}).catch(error => console.error("Error fetching member data: ", error));