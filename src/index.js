let now = new Date();
console.log(now);
let hours = now.getHours();

let minutes = ("0" + now.getMinutes()).substr(-2);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
console.log(day);
let todaysDate = `${("0" + now.getUTCDate()).substr(-2)}/${(
  "0" +
  (now.getUTCMonth() + 1)
).substr(-2)}/${now.getFullYear()}`;
console.log(todaysDate);

let currentTime = `${hours}:${minutes}`;
let time = document.getElementById("time");
time.innerHTML = currentTime;

let currentDay = `${day} <br /> ${todaysDate}`;
let date = document.getElementById("date");
date.innerHTML = currentDay;

function displayWeatherByCity(response) {
  console.log(response);
  let currentTemperature = document.getElementById("today-temperature");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let currentHumidity = document.getElementById("current-humidity");
  currentHumidity.innerHTML = `${response.data.main.humidity} %`;
  let currentWind = document.getElementById("current-wind");
  currentWind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

let form = document.getElementById("search-field");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let newCity = document.getElementById("new-city");
  let city = document.getElementById("city");
  city.innerHTML = newCity.value;
  let APIkey = `3975788e63c7f2d707103c2c24ee6bb0`;
  let weatherCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${APIkey}&units=metric`;
  console.log(weatherCityUrl);
  axios.get(weatherCityUrl).then(displayWeatherByCity);
});

function displayWeatherByLocation(response) {
  console.log(response);
  let currentTemperature = document.getElementById("today-temperature");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let currentHumidity = document.getElementById("current-humidity");
  currentHumidity.innerHTML = `${response.data.main.humidity} %`;
  let currentWind = document.getElementById("current-wind");
  currentWind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let city = document.getElementById("city");
  city.innerHTML = `${response.data.name}`;
}

let currentLocationButton = document.getElementById("current-location-button");
currentLocationButton.addEventListener("click", function (event) {
  event.preventDefault();
  function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let APIkey = `3975788e63c7f2d707103c2c24ee6bb0`;
    let weatherLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
    axios.get(weatherLocationUrl).then(displayWeatherByLocation);
    console.log(weatherLocationUrl);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
});
