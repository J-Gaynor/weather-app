import './style.css'
import { getUserLocation, searchLocation } from './location';
import { weatherApi } from './weatherApi'

const weatherDisplayDiv = document.getElementById("weather-display");
const searchBar = document.getElementById("location-input");
const searchForm = document.querySelector("form");
let weatherData;
let searchTerm;

(async () => {
    const userCoords = await getUserLocation();
    weatherData = await weatherApi(userCoords);
    displayWeather();
})();

// IF !WEATHERDATA - LOADING, ELSE - DISPLAY

const displayWeather = () => {
    console.log(weatherData.days[0]["datetime"])
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
    const feelsLike = document.createElement("h6");
    const tempMin = document.createElement("h6");
    const tempMax = document.createElement("h6");
    const conditions = document.createElement("p");

    weatherDate.textContent = weatherData.days[i]["datetime"];
    feelsLike.textContent = `Feels like ${weatherData.days[i]["feelslike"]}`;
    tempMin.textContent = `Min: ${weatherData.days[i]["tempmin"]}`;
    tempMax.textContent = `Max: ${weatherData.days[i]["tempmax"]}`;
    conditions.textContent = weatherData.days[i]["conditions"];

    weatherDiv.append(weatherDate, feelsLike, tempMin, tempMax, conditions);

    return weatherDiv;
}

searchBar.addEventListener("keyup", (e) => {
    searchTerm = e.target.value;
})

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    setTimeout(searchLocation(searchTerm), 0)
})
