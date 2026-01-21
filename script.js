// NAVIGATION ON SITE DROPDOWN
const navTrigger = document.querySelector('#nav-dropdown-trigger');
const navMenu = document.querySelector('#nav-menu');

navTrigger.addEventListener('click', (e) => {
    navMenu.classList.toggle('hidden');
    e.stopPropagation(); // Prevents immediate closing
});

// Close dropdown if user clicks anywhere else
document.addEventListener('click', () => {
    if (!navMenu.classList.contains('hidden')) {
        navMenu.classList.add('hidden');
    }
});

// REVEAL ADD TOUR FORM
const revealButton = document.getElementById('add-toure'); 
const addToureBox = document.querySelector('.add-toure');
const submitButton = document.getElementById('btn-add-toure');

revealButton.addEventListener('click', () => {
    addToureBox.classList.toggle('hidden');
});

// GLOBAL STATE
let tourDetails = []; 

// SELECTORS FOR ADDING
const inputName = document.querySelector('#input-name');
const inputKm = document.querySelector('#input-km');
const inputPrice = document.querySelector('#input-price');
const containerGrid = document.querySelector('.container-grid');

// FUNCTION TO ADD TOUR
function addNewTour() {
    if (inputName.value.trim() === '' || inputKm.value.trim() === '' || inputPrice.value.trim() === '') {
        alert('Please fill in all fields!');
        return;
    } 

    const info = {
        name: inputName.value,
        distance: Number(inputKm.value),
        price: Number(inputPrice.value) 
    };
      
    tourDetails.push(info);
    
    // Create HTML for card
    const card = document.createElement("div");
    card.classList.add('item');

    const imgDiv = document.createElement("div");
    imgDiv.classList.add('img-grid');

    const image = document.createElement("img");
    image.style.display = 'none';

    const uploadBtn = document.createElement("button");
    uploadBtn.classList.add('button-slika');
    uploadBtn.innerText = 'Upload Image';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.hidden = true;

    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            image.src = URL.createObjectURL(file);
            image.style.display = 'block';
            uploadBtn.classList.add('hidden');
        }
    });

    const textDiv = document.createElement("div");
    textDiv.classList.add('text-div');
    textDiv.innerHTML = `
        <p><strong>Tour:</strong> ${info.name}</p>
        <p><strong>Distance:</strong> ${info.distance} km</p>
        <p><strong>Price:</strong> ${info.price} $</p>
    `;

    imgDiv.append(fileInput, image, uploadBtn);
    card.append(imgDiv, textDiv);
    containerGrid.appendChild(card);

    // Clean up
    addToureBox.classList.add('hidden');
    inputName.value = ''; inputKm.value = ''; inputPrice.value = '';
}

submitButton.addEventListener('click', addNewTour);

// FILTERING LOGIC
const filterBtn = document.querySelector('.filter-toure-button');
const filterDiv = document.querySelector('.filter-toure');
filterBtn.addEventListener('click', () => filterDiv.classList.toggle('hidden'));

const applyFilterBtn = document.querySelector('.bttn-filter');

// Create Reset Button
const resetFilterBtn = document.createElement('button');
resetFilterBtn.innerText = 'RESET FILTERS';
resetFilterBtn.classList.add('reset-filter');
filterDiv.appendChild(resetFilterBtn);

applyFilterBtn.addEventListener('click', () => {
    const searchName = document.querySelector('.input-ime-filter').value.toLowerCase();
    const minD = Number(document.querySelector('.minFilterDistance').value) || 0;
    const maxD = Number(document.querySelector('.maxFilterDistance').value) || Infinity;
    const minP = Number(document.querySelector('.minFilterPrice').value) || 0;
    const maxP = Number(document.querySelector('.maxFilterPrice').value) || Infinity;

    const cards = document.querySelectorAll('.item');

    tourDetails.forEach((tour, index) => {
        const matchesName = tour.name.toLowerCase().includes(searchName);
        const matchesDist = tour.distance >= minD && tour.distance <= maxD;
        const matchesPrice = tour.price >= minP && tour.price <= maxP;

        if (matchesName && matchesDist && matchesPrice) {
            cards[index].style.display = 'flex';
        } else {
            cards[index].style.display = 'none';
        }
    });
});

resetFilterBtn.addEventListener('click', () => {
    document.querySelectorAll('.filter-toure input').forEach(input => input.value = '');
    document.querySelectorAll('.item').forEach(card => card.style.display = 'flex');
});