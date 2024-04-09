//Circle Bar and Earning Backend


let TotalEarnings = 0; // Variable to store total income

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

let currentYear;
let currentMonth;

function generateCalendar(year, month) {
    const calendarDiv = document.getElementById('calendar');
    
    // Clear previous calendar
    calendarDiv.innerHTML = '';
    
    // Create a new date object
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Create table element
    const table = document.createElement('table');
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
            if (currentDateIndex >= firstDay.getDay() && currentDate.getMonth() === month) {
                cell.textContent = currentDate.getDate();
                currentDate.setDate(currentDate.getDate() + 1);
            }
            newRow.appendChild(cell);
            currentDateIndex++;
        }
        tbody.appendChild(newRow);
    }
    
    table.appendChild(tbody);
    calendarDiv.appendChild(table);
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