//alert(`Welcome To My Weather Application!
//Type In Any City To Find Its Weather!`);

//Searching for City. Responsible for making AJAX call.
function search(city) {
  let apiKey = "a91cd2d089f0b9eff22468b81bef4d91";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=Imperial`;
  axios.get(apiUrl).then(displayCityName);
}

//Stopping default event & Logging city info
function logCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityinput");
  console.log(cityinput.value);

  search(cityinput.value);
}

//API forecast call
function forecastCall(coordinates) {
  console.log(coordinates);
  let apiKey = "ef45dbb5226daf4a30b508c33ota60fe";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayforecast);
}

//Function Display City Name & Temperature
function displayCityName(response) {
  console.log("response", response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let tempp = document.querySelector("#justTemp");
  tempp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let country = document.querySelector("#country");
  country.innerHTML = `Country: ${response.data.sys.country}`;
  let description = document.querySelector("#humidity");
  description.innerHTML = `Forcast: ${response.data.weather[0].description}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind Speed: ${response.data.wind.speed} MPH`;
  let humidity = document.querySelector("#hu");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let maxhigh = document.querySelector("#high");
  maxhigh.innerHTML = `⬆️ ${Math.round(response.data.main.temp_max)}°`;
  let maxlow = document.querySelector("#low");
  maxlow.innerHTML = `⬇️ ${Math.round(response.data.main.temp_min)}°`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  console.log(response.data.coord.lon);
  console.log(response.data.coord.lat);
  forecastCall(response.data.coord);
}

let form = document.querySelector("#forms");
form.addEventListener("submit", logCity);
search("Chicago");

//Display Day

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Display Forecast
function displayforecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let fElement = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row" id="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="weatherforecast" id="weatherforecast">
              <div class="row">
                
                <div class="col-2">
                  <div class="dayoftheweek"> <div class="dayoftheweek">${formatDay(
                    forecastDay.time
                  )}</div> </div> 
                  <div class="condition">
                ${forecastDay.condition.description}
                </div>
                   
                  <img class="sunpic"
                    src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/069/330/original/sun.png?1677515337"
                    alt="sun picture"
                    width="98"
                  />
                  <div class="forecastJustTemp" id="forecastJustTemp">32°</div>
                  <div class="weather-forecast-date"><span class="updown">⬆️${Math.round(
                    forecastDay.temperature.maximum
                  )}°
                    ⬇️${Math.round(forecastDay.temperature.minimum)}°</span>
                    </div>

                </div>
              </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  fElement.innerHTML = forecastHTML;
  console.log(response.data.daily);
}

let forecastImages = [
  "cloudy.png",
  "mist.png",
  "moon.png",
  "rain.png",
  "snow.png",
  "storm.png",
  "sun.png",
];
