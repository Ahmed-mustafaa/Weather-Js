// This file contains the JavaScript code for the weather application.

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.querySelector('.search').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const city = event.target.value;
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    fetch(`${weatherApiUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            updateWeatherInfo(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function updateWeatherInfo(data) {
    document.getElementById('country').textContent = data.sys.country;
    document.getElementById('city').textContent = data.name;
    document.getElementById('temp').textContent = `${data.main.temp}°C`;
    document.getElementById('weather-condition').textContent = data.weather[0].description;
}