import './style.css'
import { getUserLocation, searchLocation } from './location';
import { weatherApi } from './weatherApi'

const weatherDisplayDiv = document.getElementById("weather-display");
const searchBar = document.getElementById("location-input");
const searchForm = document.querySelector("form");
const unitBtn = document.getElementById("unit");
const unitSpan = document.getElementById("unit-text");
const searchResultsDiv = document.getElementById("search-results");
let displayedLocation;
let weatherData;
let searchTerm;

(async () => {
    const userCoords = await getUserLocation();
    displayedLocation = userCoords;
    weatherData = await weatherApi(userCoords, "metric");
    displayWeather();
})();

// IF !WEATHERDATA - LOADING, ELSE - DISPLAY

const displayWeather = () => {
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

    feelsLikeNumber.textContent = weatherData.days[i]["feelslike"];
    tempMinNumber.textContent = weatherData.days[i]["tempmin"];
    tempMaxNumber.textContent = weatherData.days[i]["tempmax"];

    weatherDate.textContent = weatherData.days[i]["datetime"];
    feelsLike.append("Feels like ", feelsLikeNumber);
    tempMin.append("Min: ", tempMinNumber);
    tempMax.append("Max: ", tempMaxNumber);
    conditions.textContent = weatherData.days[i]["conditions"];

    feelsLikeNumber.className = "temp-number";
    tempMinNumber.className = "temp-number";
    tempMaxNumber.className = "temp-number";

    weatherDiv.append(weatherDate, feelsLike, tempMin, tempMax, conditions);

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
    if (currentUnit === "celsius") {
        unitSpan.textContent = "Farenheit";
        tempNumbers.forEach(element => {
            element.textContent = toFarenheit(element.textContent);
        })
    } else if (currentUnit === "farenheit") {
        unitSpan.textContent = "Celsius";
        tempNumbers.forEach(element => {
            element.textContent = toCelsius(element.textContent);
        })
    }
    displayWeather();
})

const toFarenheit = (current) => {
    return ((current * 1.8) + 32).toFixed(1);
}

const toCelsius = (current) => {
    return (((current - 32) / 1.8)).toFixed(1);
}