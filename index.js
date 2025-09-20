const form = document.querySelector(".weather-form");
const cityNameInput = form.querySelector("#city-name");
const weatherInfoBlock = document.querySelector(".weather-info");

async function getWeatherByCity(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=550181b095056f82d0dcc63f71c23cf1&units=metric&lang=ru`
    );
    if (response.ok) {
        const data = await response.json();
        weatherInfoBlock.innerHTML = ""; //очищаем блок погоды
        weatherInfoBlock.appendChild(createWeatherCard(data));
    }
}

function convertDegreeToDirectionString (deg) {
    if( deg > 0 && deg < 90) {
        return "СВ";
    } else if (deg > 90 && deg < 180) {
        return "ЮВ";
    } else if (deg > 180 && deg < 270) {
        return "ЮЗ";
    } else if (deg > 280 && deg < 360) {
        return "СЗ";
    }
}


function createWeatherCard(data) {

    const sunriseTime = convertMsToHM(data.sys.sunrise);
    const sunsetTime = convertMsToHM(data.sys.sunset);
    const windDirection = convertDegreeToDirectionString(data.wind.deg);

    const weatherCard = document.createElement("div");
    weatherCard.className = "card";
    weatherCard.innerHTML = `
        <div class="header">
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.name}" />
        </div>
        <div class="content">
            <div class="temp my-10">
                <p class="real-temp">Температура: ${data.main.temp} °C</p>
                <p class="feels-like-temp">Ощущается как: ${data.main.feels_like} °C</p>
                <p class="humidity">Влажность: ${data.main.humidity}%</p>
            </div>
            <div class="wind my-10">
                <p class="speed">Скорость ветра: ${data.wind.speed} м/c</p>
                <p class="direction">Направление ветра: ${windDirection}</p>
            </div>
            <div class="sunrise-sunset my-10">
                <p class="sunrise">Рассвет: ${sunriseTime}</p>
                <p class="sunset">Закат: ${sunsetTime}</p>
            </div>
        </div>
    `;
    return weatherCard;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityName = cityNameInput.value;
    getWeatherByCity(cityName);
});

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
    }

function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;

    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;

return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}


