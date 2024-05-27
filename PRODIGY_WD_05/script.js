const apiKey = '9bd304160d469b918aa78fdb791a2e07';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const indianCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", 
    "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", 
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", 
    "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
    "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad"
];

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
        });
    }
});

function getWeatherByCoordinates(lat, lon) {
    fetch(`${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherByInput() {
    const location = document.getElementById('location-input').value;
    fetch(`${apiUrl}?q=${location}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const locationName = document.getElementById('location-name');
    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');

    locationName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    conditions.textContent = `Conditions: ${data.weather[0].description}`;
}

function filterCities() {
    const input = document.getElementById('location-input').value.toLowerCase();
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = '';

    if (input) {
        const filteredCities = indianCities.filter(city => city.toLowerCase().startsWith(input));
        filteredCities.forEach(city => {
            const div = document.createElement('div');
            div.textContent = city;
            div.onclick = () => {
                document.getElementById('location-input').value = city;
                dropdown.style.display = 'none';
            };
            dropdown.appendChild(div);
        });

        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}
