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

function displayforecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  
   
      <div class="col-2">
        <div class="weather-forcast-date">${day}</div>
        <img src=" https://openweathermap.org/img/wn/10d@2x.png" width="42" />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperatures-max"> 92°</span>
          <span class="weather-forecast-temperatures-min">89°</span>
        </div>
      </div>
   
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function citySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#searchcity");
  searchCity(input.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

let fahrenheitTemperature = null;
function changeFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = fahrenheitTemperature;
}
function changeCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", changeFahrenheit);

let celciusLink = document.querySelector("#c-link");
celciusLink.addEventListener("click", changeCelcius);

function showWeather(response) {
  fahrenheitTemperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#day-details");
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
displayforecast();
