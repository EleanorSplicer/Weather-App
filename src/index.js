let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = `${day} ${hours}:${minutes}`;

function citySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#searchcity");
  searchCity(input.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(changeFahrenhiet);
}
function changeCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperature.innerHTML = Math.round(changeCelsius);
}
let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", changeFahrenheit);

let celciusLink = document.querySelector("#c-link");
celciusLink.addEventListener("click", changeCelcius);

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#day-details");
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
function searchCity(city) {
  let apiKey = "f5e814a04eddfab1740f07bf0328eee2";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function showPosition(position) {
  let apiKey = "584d682057e027b9b963bc148ed9e2a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  let latitude = position.coords.latitude;
  let longtitude = position.coords.longitude;
  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let newButton = document.querySelector("#current-button");
newButton.addEventListener("click", getPosition);

searchCity("Sedona");
