const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search-icon button'); // Corrected selector
const notFound = document.querySelector('.not-found');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weatherInfo');
console.log(searchBtn);
console.log(container);

searchBtn.addEventListener('click', () => {
    const APIKey = 'API KEY';
    const location = document.querySelector('.search-box').value;

    if (location == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (json.cod == 404) {
                notFound.style.display = 'block';
                if (weatherBox.style.display == 'flex' && weatherDetails.style.display == 'flex') {
                    weatherBox.style.display = 'none'
                    weatherDetails.style.display = 'none'
                }

                return
            }

            notFound.style.display = 'none'
            const weatherConditionImage = document.querySelector('.weather-box img');
            console.log(weatherConditionImage)

            const temperature = document.querySelector('.weather-box .temperature');

            const description = document.querySelector('.weather-box .description');

            const humidity = document.querySelector('.weatherInfo .humid .text span');

            const wind = document.querySelector('.weatherInfo .wind .text span')

            const weatherCondition = json.weather[0].main

            console.log(weatherCondition)
            switch (weatherCondition) {
                case 'Clear':
                    weatherConditionImage.src = 'src/images/clear.png';
                    break
                case 'Clouds':
                    weatherConditionImage.src = 'src/images/cloud.png';
                    break
                case 'Rain':
                    weatherConditionImage.src = 'src/images/rain.png';
                    break
                case 'Snow':
                    weatherConditionImage.src = 'src/images/snow.png';
                    break
                case 'Haze':
                    weatherConditionImage.src = 'src/images/mist.png';
                    break

            }

            weatherBox.classList.add('column-flex')
            temperature.innerHTML = `${parseInt(json.main.temp)}<span style="font-size:1rem;position:absolute; margin-top:1rem; ">°C</span>`;

            description.innerHTML = json.weather[0].description

            weatherDetails.style.display = 'flex'
            humidity.innerHTML = json.main.humidity
            wind.innerHTML = json.wind.speed

        });
});
