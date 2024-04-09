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