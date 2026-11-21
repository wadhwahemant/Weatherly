const submit = document.querySelector('button')

submit.addEventListener('click', function (e) {
    e.preventDefault()
    const cityInput = document.querySelector("#cityInput")

    const fetchURL = `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput.value}&count=1&language=en&format=json`
    fetch(fetchURL).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data);

        const longitude = data.results[0].longitude
        const latitude = data.results[0].latitude
        const cityName = data.results[0].name;
        const country = data.results[0].country;

        const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`

        fetch(weatherApiUrl).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data);
            const current = data.current;

            
            const currentWeather = document.querySelector("#currentWeather");
            document.querySelector("#weatherDashboard").hidden = false;
            currentWeather.innerHTML = `
    <div class="weather-info">

        <div class="location">
            <i data-lucide="map-pin"></i>
            <h3>${cityName}, ${country}</h3>
        </div>

        <div class="temperature">
            <i data-lucide="cloud-sun"></i>
            <h1>${current.temperature_2m}°C</h1>
            <p>Current Temperature</p>
        </div>

        <div class="weather-details">

            <div class="detail-card">
                <i data-lucide="thermometer"></i>
                <h3>Feels Like</h3>
                <p>${current.apparent_temperature}°C</p>
            </div>

            <div class="detail-card">
                <i data-lucide="droplets"></i>
                <h3>Humidity</h3>
                <p>${current.relative_humidity_2m}%</p>
            </div>

            <div class="detail-card">
                <i data-lucide="wind"></i>
                <h3>Wind Speed</h3>
                <p>${current.wind_speed_10m} km/h</p>
            </div>

            <div class="detail-card">
                <i data-lucide="gauge"></i>
                <h3>Pressure</h3>
                <p>${current.surface_pressure} hPa</p>
            </div>

        </div>
    </div>
`;

lucide.createIcons();
        })

    })
})

