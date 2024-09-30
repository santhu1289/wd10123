
function isAgeValid(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
}


function loadStoredData() {
    const storedData = localStorage.getItem('registrations');
    if (storedData) {
        const registrations = JSON.parse(storedData);
        const tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = ''; 

        registrations.forEach(registration => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${registration.name}</td>
                <td>${registration.email}</td>
                <td>${registration.password}</td>
                <td>${registration.dob}</td>
                <td>${registration.termsAccepted}</td>
            `;
            tableBody.appendChild(newRow);
        });
    }
}


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

  
    if (!isAgeValid(dob)) {
        alert('Age must be between 18 and 55.');
        return; 
    }

  
    const registration = {
        name,
        email,
        password,
        dob,
        termsAccepted
    };

  
    const storedData = localStorage.getItem('registrations');
    let registrations = storedData ? JSON.parse(storedData) : [];


    registrations.push(registration);


    localStorage.setItem('registrations', JSON.stringify(registrations));


    loadStoredData();

    document.getElementById('registrationForm').reset();
});


