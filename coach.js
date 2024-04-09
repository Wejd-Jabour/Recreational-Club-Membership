
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

function revealCalendar() {
    document.getElementById("Income Section").style.display = "none";
    document.getElementById("Expense Section").style.display = "none";
    document.getElementById("CalendarSection").style.display = "block";
}


function storeInput() {
    // Step 1: Get a reference to the input element
    var usernameElement = document.getElementById('usernamesInput');
    var messageElement = document.getElementById('messageInput');
    // Step 2: Retrieve the value entered by the user
    var usernameInput = usernameElement.value;
    var messageInput = messageElement.value;
    // Step 3: Store the value as needed
    // For example, you can store it in a variable
    //var storedValue = usernameInput;
    console.log("Stored value:", usernameInput);
    console.log("Stored value:", messageInput);
}
