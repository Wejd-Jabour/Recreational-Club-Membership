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
            const cellList = document.createElement('ul'); // Create an <ul> for list items
            if (currentDateIndex >= firstDay.getDay() && currentDate.getMonth() === month) {
                cell.textContent = currentDate.getDate();
                const dateItem = document.createElement('li'); // Create an <li> element for the date
                cellList.appendChild(dateItem); // Append date item to the list
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