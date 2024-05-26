document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-button');
    const refreshButton = document.getElementById('refresh-button');
    const clearButton = document.getElementById('clear-button');
    const themeButton = document.getElementById('theme-button');

    fetchButton.addEventListener('click', fetchData);
    refreshButton.addEventListener('click', refreshData);
    clearButton.addEventListener('click', clearData);
    themeButton.addEventListener('click', changeTheme);
});

const colors = [
    "#007bff", "#ff9800", "#4caf50", "#e91e63", "#9c27b0", "#3f51b5", "#00bcd4", 
    "#8bc34a", "#ffc107", "#ff5722", "#795548", "#607d8b", "#673ab7", "#009688", 
    "#cddc39"
];

function fetchData() {
    const apiUrl = 'https://randomuser.me/api/';
    const feedback = document.getElementById('feedback');

    feedback.textContent = 'Fetching data...';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // For debugging
            processData(data.results[0]);
            feedback.textContent = 'Data fetched successfully!';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            feedback.textContent = 'Error fetching data. Please try again.';
        });
}

function processData(user) {
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // Clear previous data

    const itemElement = document.createElement('div');
    itemElement.className = 'data-item';

    itemElement.innerHTML = `
        <img src="${user.picture.large}" alt="User Picture">
        <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
    `;

    container.appendChild(itemElement);
}

function refreshData() {
    clearData();
    fetchData();
}

function clearData() {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    const feedback = document.getElementById('feedback');
    feedback.textContent = 'Data cleared.';
}

function changeTheme() {
    const primaryColor = colors[Math.floor(Math.random() * colors.length)];
    const secondaryColor = colors[Math.floor(Math.random() * colors.length)];
    const accentColor = colors[Math.floor(Math.random() * colors.length)];

    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
}
