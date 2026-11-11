import './style.css'
import { getUserLocation, searchLocation } from './location';
import { weatherApi } from './weatherApi'

const weatherDisplayDiv = document.getElementById("weather-display");
const forecastMessageDiv = document.getElementById("forecast-message");
const main = document.querySelector("main");
const searchBar = document.getElementById("location-input");
const searchForm = document.querySelector("form");
const unitBtn = document.getElementById("unit");
const unitSpan = document.getElementById("unit-text");
const searchResultsDiv = document.getElementById("search-results");
const viewingLocation = document.getElementById("current-location");
let displayedLocation;
let weatherData;
let searchTerm;

const showLoading = () => {
    main.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading weather forecast...</p>
        </div>
    `;
};

(async () => {
    showLoading();
    const userCoords = await getUserLocation();
    displayedLocation = userCoords;
    if (viewingLocation && userCoords.cityName) {
        viewingLocation.textContent = userCoords.cityName;
    }
    const apiUnit = unitSpan.textContent.includes("F") ? "us" : "metric";
    weatherData = await weatherApi(userCoords, apiUnit);
    displayWeather();
})();

const displayWeather = () => {
    main.innerHTML = "";
    weatherDisplayDiv.innerHTML = "";
    const todaysWeather = document.createElement("div");
    const futureWeather = document.createElement("div");

    const mainWeatherDiv = createWeatherDiv(0);
    mainWeatherDiv.id = "main-weather-div";
    todaysWeather.appendChild(mainWeatherDiv);
    futureWeather.id = "future-weather-container";

    for (let i = 1; i < 15; i++) {
        const smallWeatherDiv = createWeatherDiv(i);
        smallWeatherDiv.className = "future-weather-div";
        futureWeather.appendChild(smallWeatherDiv);
    }

    weatherDisplayDiv.appendChild(todaysWeather);
    weatherDisplayDiv.appendChild(futureWeather);
    main.append(forecastMessageDiv, weatherDisplayDiv);
}

const createWeatherDiv = (i) => {
    const weatherDiv = document.createElement("div");
    const weatherDate = document.createElement("h5");
    const feelsLikeNumber = document.createElement("span");
    const tempMinNumber = document.createElement("span");
    const tempMaxNumber = document.createElement("span");
    const feelsLike = document.createElement("h6");
    const tempMin = document.createElement("h6");
    const tempMax = document.createElement("h6");
    const conditions = document.createElement("p");

    const isFahrenheit = unitSpan.textContent.includes("F");
    const rawFeels = weatherData.days[i]["feelslike"];
    const rawMin = weatherData.days[i]["tempmin"];
    const rawMax = weatherData.days[i]["tempmax"];

    feelsLikeNumber.textContent = isFahrenheit ? toFarenheit(rawFeels) : rawFeels;
    tempMinNumber.textContent = isFahrenheit ? toFarenheit(rawMin) : rawMin;
    tempMaxNumber.textContent = isFahrenheit ? toFarenheit(rawMax) : rawMax;

    const rawDate = weatherData.days[i]["datetime"];
    let formattedDate = rawDate;
    try {
        const parts = rawDate.split("-");
        const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
        formattedDate = i === 0 ? "Today" : dateObj.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    } catch {
        formattedDate = rawDate;
    }
    weatherDate.textContent = formattedDate;

    feelsLike.append("Feels like ", feelsLikeNumber);
    tempMin.append("Min: ", tempMinNumber);
    tempMax.append("Max: ", tempMaxNumber);
    conditions.textContent = weatherData.days[i]["conditions"];

    feelsLikeNumber.className = "temp-number";
    tempMinNumber.className = "temp-number";
    tempMaxNumber.className = "temp-number";

    weatherDiv.append(weatherDate, conditions, feelsLike, tempMin, tempMax);

    return weatherDiv;
}

searchBar.addEventListener("keyup", (e) => {
    searchTerm = e.target.value;
})

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    searchResultsDiv.innerHTML = "";
    const results = await searchLocation(searchTerm);
    results.forEach(city => {
        const searchDiv = document.createElement("div");
        searchDiv.className = "search-result-item";
        const cityName = document.createElement("h6");
        const countryName = document.createElement("p");
        cityName.textContent = city.name;
        countryName.textContent = city.country;
        searchDiv.append(cityName, countryName);
        searchResultsDiv.append(searchDiv);

        searchDiv.addEventListener("click", async () => {
            displayedLocation = { latitude: city.latitude, longitude: city.longitude };
            if (viewingLocation) {
                viewingLocation.textContent = `${city.name}, ${city.country}`;
            }
            searchResultsDiv.innerHTML = "";
            searchBar.value = "";
            showLoading();
            const apiUnit = unitSpan.textContent.includes("F") ? "us" : "metric";
            weatherData = await weatherApi(displayedLocation, apiUnit);
            displayWeather();
        })
    });
})

document.addEventListener("click", (e) => {
    if (!searchForm.contains(e.target)) {
        searchResultsDiv.innerHTML = "";
    }
});

unitBtn.addEventListener("click", async () => {
    let currentUnit = unitSpan.textContent.toLowerCase().trim();
    const tempNumbers = Array.from(document.getElementsByClassName("temp-number"));
    if (currentUnit === "°c") {
        unitSpan.textContent = "°F";
        tempNumbers.forEach(element => {
            element.textContent = toFarenheit(element.textContent);
        })
    } else if (currentUnit === "°f") {
        unitSpan.textContent = "°C";
        tempNumbers.forEach(element => {
            element.textContent = toCelsius(element.textContent);
        })
    }
})

const toFarenheit = (current) => {
    return ((current * 1.8) + 32).toFixed(1);
}

const toCelsius = (current) => {
    return (((current - 32) / 1.8)).toFixed(1);
}