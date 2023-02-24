//alert(`Welcome To My Weather Application!
//Type In Any City To Find Its Weather!`);

//Searching for City. Responsible for making AJAX call.
function search(city) {
  let apiKey = "a91cd2d089f0b9eff22468b81bef4d91";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=Metric`;
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
  let apiKey = " 5397bf59109et4bf3da3dbddao74e180";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=Lisbon&key=5397bf59109et4bf3da3dbddao74e180&units=Metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayforecast);
}

//Function Display City Name & Temperature
function displayCityName(response) {
  console.log(response.data.main);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let tempp = document.querySelector("#justTemp");
  tempp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let country = document.querySelector("#precipitation");
  country.innerHTML = `Country: ${response.data.sys.country}`;
  let description = document.querySelector("#humidity");
  description.innerHTML = `Forcast: ${response.data.weather[0].description}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind Speed: ${response.data.wind.speed} MPH`;
  let humidity = document.querySelector("#hu");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  let maxhigh = document.querySelector("#high");
  maxhigh.innerHTML = `H: ${Math.round(response.data.main.temp_max)}`;
  let maxlow = document.querySelector("#low");
  maxlow.innerHTML = `L: ${Math.round(response.data.main.temp_min)}`;
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
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Friday", "Sat"];
  return day[days];
}

//Display Forecast
function displayforecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let fElement = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row" id="row">`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Friday", "Sat"];
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
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
                    alt="sun picture"
                    width="98"
                  />
                  <div class="weather-forecast-date"><span class="updown">⬆️${Math.round(
                    forecastDay.temperature.maximum
                  )}
                    ⬇️${Math.round(forecastDay.temperature.minimum)}</span>
                    </div>

                </div>
              </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  fElement.innerHTML = forecastHTML;
  console.log(response.data.daily);
}