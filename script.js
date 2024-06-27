document.getElementById('get-weather').addEventListener('click', function() {
    const zipCode = document.getElementById('zip-code').value;
    if (!zipCode) {
        alert('Please enter a zip code');
        return;
    }

    const apiKey = 'f04dfe50766197aa3ac957a017e76a90'; 
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Error fetching the weather data. Please try again.');
        });
});

function displayWeatherData(data) {
    const date = new Date().toLocaleDateString();
    const city = data.name;
    const temp = data.main.temp;
    const conditions = data.weather[0].description;
    const tempHigh = data.main.temp_max;
    const tempLow = data.main.temp_min;
    const icon = data.weather[0].icon;

    document.getElementById('date').textContent = date;
    document.getElementById('city').textContent = city;
    document.getElementById('temperature').textContent = `${temp}°F`;
    document.getElementById('conditions').textContent = conditions;
    document.getElementById('temp-high-low').textContent = `High: ${tempHigh}°F / Low: ${tempLow}°F`;
    document.getElementById('icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="${conditions} icon">`;

    const weatherCard = document.getElementById('weather-card');

    // Reset the opacity for fade-in effect
    weatherCard.style.opacity = 0;
    
    if (temp <= 50) {
        weatherCard.className = 'cold';
    } else if (temp <= 70) {
        weatherCard.className = 'neutral';
    } else {
        weatherCard.className = 'warm';
    }

    weatherCard.classList.remove('hidden');
    weatherCard.classList.add('visible');

      // Trigger the fade-in effect
      setTimeout(() => {
        weatherCard.style.opacity = 1;
    }, 10);

}
