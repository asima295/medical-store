// Function to load medicines from localStorage
function loadMedicines() {
    const medicines = JSON.parse(localStorage.getItem('medicines')) || [];
    const medicineList = document.getElementById('medicineList');
    medicineList.innerHTML = '';

    medicines.forEach((medicine, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${medicine.name}</td>
            <td>${medicine.quantity}</td>
            <td>${medicine.price}</td>
            <td>
                <button class="delete-btn" onclick="reduceQuantity(${index})">Sell 1</button>
            </td>
        `;
        medicineList.appendChild(row);
    });
}

// Function to add medicine to inventory
function addMedicine() {
    const name = document.getElementById('medicineName').value.trim();
    const quantity = parseInt(document.getElementById('medicineQuantity').value);
    const price = parseFloat(document.getElementById('medicinePrice').value);

    if (name && quantity > 0 && price > 0) {
        const medicines = JSON.parse(localStorage.getItem('medicines')) || [];

        const existingMedicine = medicines.find(med => med.name.toLowerCase() === name.toLowerCase());
        if (existingMedicine) {
            existingMedicine.quantity += quantity; // Update quantity if medicine already exists
        } else {
            medicines.push({ name, quantity, price }); // Add new medicine
        }

        localStorage.setItem('medicines', JSON.stringify(medicines));
        loadMedicines();
        alert(`${name} added successfully!`);
    } else {
        alert('Please enter valid medicine details.');
    }

    document.getElementById('medicineName').value = '';
    document.getElementById('medicineQuantity').value = '';
    document.getElementById('medicinePrice').value = '';
}

// Function to reduce quantity when selling medicine
function reduceQuantity(index) {
    const medicines = JSON.parse(localStorage.getItem('medicines'));
    if (medicines[index].quantity > 1) {
        medicines[index].quantity -= 1;
        localStorage.setItem('medicines', JSON.stringify(medicines));
        loadMedicines();
    } else {
        alert(`${medicines[index].name} is now out of stock!`);
        medicines.splice(index, 1); // Remove medicine if quantity reaches zero
        localStorage.setItem('medicines', JSON.stringify(medicines));
        loadMedicines();
    }
}

// Function to search for medicines
function searchMedicine() {
    const searchQuery = document.getElementById('searchMedicine').value.toLowerCase();
    const medicines = JSON.parse(localStorage.getItem('medicines')) || [];
    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery)
    );

    const medicineList = document.getElementById('medicineList');
    medicineList.innerHTML = '';

    filteredMedicines.forEach((medicine, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${medicine.name}</td>
            <td>${medicine.quantity}</td>
            <td>${medicine.price}</td>
            <td>
                <button class="delete-btn" onclick="reduceQuantity(${index})">Sell 1</button>
            </td>
        `;
        medicineList.appendChild(row);
    });
}

// Initialize the app by loading existing medicines
window.onload = loadMedicines;
