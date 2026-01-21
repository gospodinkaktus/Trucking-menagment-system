const nameInput = document.querySelector('.name-login');
const idInput = document.querySelector('.id-login');
const loginBtn = document.querySelector('.login-button');

// Database of drivers
const drivers = [{ id: 123, name: 'ajdin' }];

function performLogin() {
    const enteredId = Number(idInput.value);
    const enteredName = nameInput.value.trim().toLowerCase();

    // Check if driver exists
    const driverFound = drivers.find(d => d.id === enteredId && d.name === enteredName);

    if (driverFound) {
        window.location.href = "index.html";
    } else {
        alert("Incorrect credentials. Please try again.");
    }
}

loginBtn.addEventListener('click', performLogin);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performLogin();
});