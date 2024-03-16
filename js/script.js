    document.addEventListener("DOMContentLoaded", function() {
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                createCountryCard(country);
            });
        })
        .catch(error => console.error('Error fetching countries:', error));
});

function createCountryCard(country) {
    const { capital, name, flags, region, latlng, cca2, population } = country;
    const card = document.createElement("div");
    card.classList.add("col-md-4");

    const cardContent = `
        <div class="card">
            <img src="${flags.png}" class="card-img-top" alt="${name.common} Flag">
            <div class="card-body">
                <h5 class="card-title">${name.common}</h5>
                <p class="card-text">Capital: ${capital}</p>
                <p class="card-text">Region: ${region}</p>
                <p class="card-text">Population: ${population}</p>
                <p class="card-text">Latlng: ${latlng}</p>
                <p class="card-text">Country codes: ${cca2}</p>
                <button class="btn btn-primary" onclick="getWeather('${name.common}')">Get Weather</button>
            </div>
        </div>
    `;
    card.innerHTML = cardContent;
    document.getElementById("countryCards").appendChild(card);
}

function getWeather(countryName) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=85ac2c8b3e3508c5cc01f57317dad418`
    )
      .then((response) => response.json())
      .then((data) => {
        const weather = {
          main: data.weather[0].main,
          description: data.weather[0].description,
          temperature: (data.main.temp - 273.15).toFixed(2) + "°C",
        };
        alert(
          `Weather in ${countryName}:\n${weather.main} - ${weather.description}\nTemperature: ${weather.temperature}`
        );
      })
      .catch((error) => console.error("Error fetching weather:", error));
}