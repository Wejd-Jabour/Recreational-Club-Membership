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
    

    //creates regular table (no sorting)
    const dbRef = firebase.database().ref();

    dbRef.child('Member').once('value', (snapshot) => {
        const members = snapshot.val();


        //create array of all members
        const memberArray = Object.keys(members).map(memberKey =>({
            key: memberKey
        }));


        const regularTable = document.createElement("table");
        regularTable.style.transform = "translate(20%, -240%)";
        regularTable.style.position = "static"
        const regTableBody = document.createElement("tBody");

        memberArray.forEach(member => {
            const row = document.createElement("tr");
            
            let name = document.createElement('td');
            name.textContent = member.key;
            
            let email = document.createElement('td');
            email.textContent = members[member.key].Email;
            
            let attendance = document.createElement('td');
            attendance.textContent = members[member.key].Classes;
            
            let payments = document.createElement('td');
            payments.textContent = members[member.key].Payments_Total;

            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(attendance);
            row.appendChild(payments);
            
            regTableBody.appendChild(row);
        });

        regularTable.appendChild(regTableBody);
        document.body.appendChild(regularTable);

    });

    //creates table sorted by classes attended
    dbRef.child('Member').once('value', (snapshot) => {
        const members = snapshot.val();

        // Convert members object into an array of objects with member key and classes attended
        const membersArrayA = Object.keys(members).map(memberKey => ({
            key: memberKey,
            classesAttended: members[memberKey].Classes
        }));

        // Sort the members array by classes attended (descending order)
        membersArrayA.sort((a, b) => b.classesAttended - a.classesAttended);

        const classTable = document.createElement("table");
        classTable.style.transform = "translate(20%, 50%)";
        classTable.style.position= "static";
        const classTblBody = document.createElement("tBody");
        
        // Iterate through the sorted members array and create table rows
        membersArrayA.forEach(member => {
            const row = document.createElement("tr");
            
            let name = document.createElement('td');
            name.textContent = member.key;
            
            let email = document.createElement('td');
            email.textContent = members[member.key].Email;
            
            let attendance = document.createElement('td');
            attendance.textContent = member.classesAttended;
            
            let payments = document.createElement('td');
            payments.textContent = members[member.key].Payments_Total;

            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(attendance);
            row.appendChild(payments);

            classTblBody.appendChild(row);
        });

        classTable.appendChild(classTblBody);
        document.body.appendChild(classTable);
    });


    //creates table sorted by total payments
    dbRef.child('Member').once('value', (snapshot) => {
        const members = snapshot.val();

        // Convert members object into an array of objects with member key and Payments_Total
        const membersArrayB = Object.keys(members).map(memberKey => ({
            key: memberKey,
            totalPayments: members[memberKey].Payments_Total
        }));

        // Sort the members array by classes attended (descending order)
        membersArrayB.sort((a, b) => b.totalPayments - a.totalPayments);

        const paymentTable = document.createElement("table");
        paymentTable.style.transform = "translate(20%, 350%)";
        paymentTable.style.position= "static";
        const paymentTblBody = document.createElement("tBody");
        
        // Iterate through the sorted members array and create table rows
        membersArrayB.forEach(member => {
            const row = document.createElement("tr");
            
            let name = document.createElement('td');
            name.textContent = member.key;
            
            let email = document.createElement('td');
            email.textContent = members[member.key].Email;
            
            let attendance = document.createElement('td');
            attendance.textContent = members[member.key].Classes;
            
            let payments = document.createElement('td');
            payments.textContent = members[member.key].Payments_Total;
            
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(attendance);
            row.appendChild(payments);

            paymentTblBody.appendChild(row);
        });

        paymentTable.appendChild(paymentTblBody);
        document.body.appendChild(paymentTable);
    });
}
