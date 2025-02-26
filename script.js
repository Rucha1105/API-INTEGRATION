const apiKey = '5f301bf3b4eeae6d13363643e90908d2'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('weatherForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission
  const city = document.getElementById('cityInput').value;
  fetchWeather(city);
});

function fetchWeather(city) {
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        alert('City not found. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function displayWeather(data) {
  const weatherDataDiv = document.getElementById('weatherData');
  const { name, main, weather, wind } = data;

  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherDataDiv.innerHTML = `
    <h2>${name}</h2>
    <img src="${weatherIcon}" alt="${weather[0].description}">
    <p><i class="fas fa-thermometer-half"></i> Temperature: ${main.temp}°C</p>
    <p><i class="fas fa-tint"></i> Humidity: ${main.humidity}%</p>
    <p><i class="fas fa-wind"></i> Wind Speed: ${wind.speed} m/s</p>
    <p><i class="fas fa-cloud"></i> Weather: ${weather[0].description}</p>
  `;
}