// DOM elements
const countriesElement = document.getElementById('countries');
const searchInput = document.getElementById('search');
const toggleDark = document.getElementById('toggle-dark');

// Fetch and display countries
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        
        displayCountries(countries);

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const filteredCountries = countries.filter(country =>
                country.name.common.toLowerCase().includes(query)
            );
            displayCountries(filteredCountries);
        });
    } catch (error) {
        console.error('Failed to fetch countries:', error);
    }
}

// Render country cards
function displayCountries(countries) {
    countriesElement.innerHTML = ''; // Clear previous content

    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card';

        card.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
            <p>${country.name.common}</p>
        `;

        countriesElement.appendChild(card);
    });
}

// Dark mode toggle
toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Initialize
fetchCountries();



toggleDark.onclick = function() {
  if (document.body.style.backgroundColor === 'black') {
    document.body.style.backgroundColor = 'white';
  } else {
    document.body.style.backgroundColor = 'black';
  }
};

fetchCountries();