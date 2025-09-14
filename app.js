// Weather Dashboard JavaScript

// Weather data (simulated API response)
const weatherData = {
  "currentWeather": {
    "location": "New York, NY",
    "country": "United States",
    "temperature": 22,
    "condition": "Partly Cloudy",
    "icon": "partly-cloudy-day",
    "feelsLike": 25,
    "humidity": 65,
    "windSpeed": 12,
    "windDirection": "NW",
    "uvIndex": 6,
    "visibility": 16,
    "pressure": 1013,
    "dewPoint": 15,
    "airQuality": 42,
    "sunrise": "06:30",
    "sunset": "19:45",
    "lastUpdated": "2025-09-14T17:11:00Z"
  },
  "hourlyForecast": [
    {"time": "18:00", "temp": 22, "condition": "Partly Cloudy", "precipitation": 10, "wind": 12, "icon": "partly-cloudy"},
    {"time": "19:00", "temp": 21, "condition": "Cloudy", "precipitation": 20, "wind": 14, "icon": "cloudy"},
    {"time": "20:00", "temp": 20, "condition": "Light Rain", "precipitation": 60, "wind": 16, "icon": "rain"},
    {"time": "21:00", "temp": 19, "condition": "Rain", "precipitation": 80, "wind": 18, "icon": "rain"},
    {"time": "22:00", "temp": 18, "condition": "Heavy Rain", "precipitation": 90, "wind": 20, "icon": "heavy-rain"},
    {"time": "23:00", "temp": 17, "condition": "Rain", "precipitation": 75, "wind": 18, "icon": "rain"},
    {"time": "00:00", "temp": 16, "condition": "Light Rain", "precipitation": 45, "wind": 15, "icon": "light-rain"},
    {"time": "01:00", "temp": 15, "condition": "Cloudy", "precipitation": 25, "wind": 12, "icon": "cloudy"},
    {"time": "02:00", "temp": 14, "condition": "Partly Cloudy", "precipitation": 15, "wind": 10, "icon": "partly-cloudy-night"},
    {"time": "03:00", "temp": 13, "condition": "Clear", "precipitation": 5, "wind": 8, "icon": "clear-night"},
    {"time": "04:00", "temp": 12, "condition": "Clear", "precipitation": 0, "wind": 6, "icon": "clear-night"},
    {"time": "05:00", "temp": 11, "condition": "Clear", "precipitation": 0, "wind": 5, "icon": "clear-night"},
    {"time": "06:00", "temp": 12, "condition": "Partly Cloudy", "precipitation": 10, "wind": 7, "icon": "partly-cloudy-day"},
    {"time": "07:00", "temp": 14, "condition": "Partly Cloudy", "precipitation": 15, "wind": 9, "icon": "partly-cloudy-day"},
    {"time": "08:00", "temp": 16, "condition": "Sunny", "precipitation": 5, "wind": 10, "icon": "sunny"},
    {"time": "09:00", "temp": 18, "condition": "Sunny", "precipitation": 0, "wind": 12, "icon": "sunny"},
    {"time": "10:00", "temp": 20, "condition": "Sunny", "precipitation": 0, "wind": 14, "icon": "sunny"},
    {"time": "11:00", "temp": 22, "condition": "Partly Cloudy", "precipitation": 10, "wind": 15, "icon": "partly-cloudy-day"},
    {"time": "12:00", "temp": 24, "condition": "Partly Cloudy", "precipitation": 15, "wind": 16, "icon": "partly-cloudy-day"},
    {"time": "13:00", "temp": 25, "condition": "Cloudy", "precipitation": 25, "wind": 17, "icon": "cloudy"},
    {"time": "14:00", "temp": 26, "condition": "Cloudy", "precipitation": 30, "wind": 18, "icon": "cloudy"},
    {"time": "15:00", "temp": 25, "condition": "Partly Cloudy", "precipitation": 20, "wind": 17, "icon": "partly-cloudy-day"},
    {"time": "16:00", "temp": 24, "condition": "Partly Cloudy", "precipitation": 15, "wind": 16, "icon": "partly-cloudy-day"},
    {"time": "17:00", "temp": 23, "condition": "Partly Cloudy", "precipitation": 10, "wind": 14, "icon": "partly-cloudy-day"}
  ],
  "dailyForecast": [
    {"day": "Today", "date": "Sep 14", "high": 26, "low": 11, "condition": "Partly Cloudy", "precipitation": 40, "icon": "partly-cloudy-day"},
    {"day": "Tomorrow", "date": "Sep 15", "high": 28, "low": 13, "condition": "Sunny", "precipitation": 10, "icon": "sunny"},
    {"day": "Monday", "date": "Sep 16", "high": 30, "low": 15, "condition": "Sunny", "precipitation": 5, "icon": "sunny"},
    {"day": "Tuesday", "date": "Sep 17", "high": 27, "low": 16, "condition": "Thunderstorm", "precipitation": 85, "icon": "thunderstorm"},
    {"day": "Wednesday", "date": "Sep 18", "high": 24, "low": 14, "condition": "Rain", "precipitation": 70, "icon": "rain"},
    {"day": "Thursday", "date": "Sep 19", "high": 26, "low": 15, "condition": "Cloudy", "precipitation": 30, "icon": "cloudy"},
    {"day": "Friday", "date": "Sep 20", "high": 29, "low": 17, "condition": "Partly Cloudy", "precipitation": 20, "icon": "partly-cloudy-day"}
  ],
  "historicalData": [
    {"date": "Aug 15", "temp": 28}, {"date": "Aug 16", "temp": 30}, {"date": "Aug 17", "temp": 29}, {"date": "Aug 18", "temp": 27}, {"date": "Aug 19", "temp": 25}, {"date": "Aug 20", "temp": 26}, {"date": "Aug 21", "temp": 28},
    {"date": "Aug 22", "temp": 31}, {"date": "Aug 23", "temp": 33}, {"date": "Aug 24", "temp": 32}, {"date": "Aug 25", "temp": 30}, {"date": "Aug 26", "temp": 28}, {"date": "Aug 27", "temp": 27}, {"date": "Aug 28", "temp": 29},
    {"date": "Aug 29", "temp": 31}, {"date": "Aug 30", "temp": 30}, {"date": "Aug 31", "temp": 28}, {"date": "Sep 1", "temp": 26}, {"date": "Sep 2", "temp": 24}, {"date": "Sep 3", "temp": 25}, {"date": "Sep 4", "temp": 27},
    {"date": "Sep 5", "temp": 29}, {"date": "Sep 6", "temp": 28}, {"date": "Sep 7", "temp": 26}, {"date": "Sep 8", "temp": 24}, {"date": "Sep 9", "temp": 23}, {"date": "Sep 10", "temp": 25}, {"date": "Sep 11", "temp": 27},
    {"date": "Sep 12", "temp": 26}, {"date": "Sep 13", "temp": 24}, {"date": "Sep 14", "temp": 22}
  ],
  "savedLocations": [
    {"name": "New York, NY", "temp": 22, "condition": "Partly Cloudy", "icon": "partly-cloudy-day"},
    {"name": "Los Angeles, CA", "temp": 28, "condition": "Sunny", "icon": "sunny"},
    {"name": "London, UK", "temp": 18, "condition": "Rain", "icon": "rain"},
    {"name": "Tokyo, Japan", "temp": 25, "condition": "Cloudy", "icon": "cloudy"},
    {"name": "Sydney, Australia", "temp": 20, "condition": "Partly Cloudy", "icon": "partly-cloudy-day"}
  ],
  "weatherAlerts": [
    {"type": "warning", "title": "Heavy Rain Warning", "description": "Heavy rainfall expected between 8 PM - 12 AM tonight. Avoid unnecessary travel.", "urgency": "moderate"},
    {"type": "info", "title": "UV Index High", "description": "UV levels will be high tomorrow. Use sunscreen and protective clothing.", "urgency": "low"}
  ],
  "airQualityData": {
    "aqi": 42,
    "level": "Good",
    "description": "Air quality is satisfactory and poses little or no risk.",
    "pollutants": {
      "pm25": 12,
      "pm10": 18,
      "no2": 8,
      "o3": 65,
      "co": 0.3
    }
  }
};

// Global state
let currentUnits = 'celsius';
let currentTheme = 'light';
let temperatureChart = null;
let currentForecastTab = 'hourly';

// Sample cities for search autocomplete
const sampleCities = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'London, UK', 'Paris, France', 'Tokyo, Japan', 'Sydney, Australia', 'Toronto, Canada',
  'Berlin, Germany', 'Rome, Italy', 'Madrid, Spain', 'Amsterdam, Netherlands', 'Stockholm, Sweden'
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Show loading screen
    setTimeout(() => {
        hideLoadingScreen();
        initializeWeatherData();
        initializeEventListeners();
        initializeChart();
        createWeatherParticles();
        displayWeatherAlerts();
    }, 2000);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

function initializeWeatherData() {
    displayCurrentWeather();
    displayWeatherMetrics();
    displayHourlyForecast();
    displayDailyForecast();
    displaySavedLocations();
    displayAirQuality();
}

function initializeEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Units toggle
    const unitsToggle = document.getElementById('unitsToggle');
    unitsToggle.addEventListener('click', toggleUnits);

    // Search functionality
    const locationSearch = document.getElementById('locationSearch');
    locationSearch.addEventListener('input', handleSearchInput);
    locationSearch.addEventListener('focus', handleSearchFocus);
    locationSearch.addEventListener('keydown', handleSearchKeydown);
    
    // Close search suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSearchSuggestions();
        }
    });

    // Forecast tabs
    const hourlyTab = document.getElementById('hourlyTab');
    const dailyTab = document.getElementById('dailyTab');
    hourlyTab.addEventListener('click', () => switchForecastTab('hourly'));
    dailyTab.addEventListener('click', () => switchForecastTab('daily'));

    // Modal functionality
    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', hideModal);

    // Metric cards hover effects
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            showMetricDetails(card.dataset.metric);
        });
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showMetricDetails(card.dataset.metric);
            }
        });
    });

    // Add location button
    const addLocationBtn = document.getElementById('addLocationBtn');
    addLocationBtn.addEventListener('click', () => {
        const locationSearch = document.getElementById('locationSearch');
        locationSearch.focus();
    });

    // Map layer controls
    const mapLayers = document.querySelectorAll('.map-layer');
    mapLayers.forEach(layer => {
        layer.addEventListener('click', (e) => switchMapLayer(layer.dataset.layer, e));
    });

    // Close modal on outside click
    const modal = document.getElementById('weatherModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function displayCurrentWeather() {
    const current = weatherData.currentWeather;
    
    document.getElementById('currentTemp').textContent = formatTemperature(current.temperature);
    document.getElementById('currentLocation').textContent = current.location;
    document.getElementById('currentCondition').textContent = current.condition;
    document.getElementById('sunrise').textContent = formatTime(current.sunrise);
    document.getElementById('sunset').textContent = formatTime(current.sunset);
    document.getElementById('lastUpdated').textContent = `Last updated: ${formatLastUpdated(current.lastUpdated)}`;
    
    const weatherIcon = document.getElementById('currentWeatherIcon');
    weatherIcon.className = `weather-icon animated-icon ${current.icon}`;
}

function displayWeatherMetrics() {
    const current = weatherData.currentWeather;
    
    document.getElementById('feelsLike').textContent = formatTemperature(current.feelsLike);
    document.getElementById('humidity').textContent = `${current.humidity}%`;
    document.getElementById('windSpeed').textContent = formatWindSpeed(current.windSpeed);
    document.getElementById('uvIndex').textContent = current.uvIndex;
    document.getElementById('visibility').textContent = formatDistance(current.visibility);
    document.getElementById('pressure').textContent = `${current.pressure} mb`;
}

function displayHourlyForecast() {
    const hourlyContainer = document.querySelector('#hourlyForecast .forecast-scroll');
    hourlyContainer.innerHTML = '';

    weatherData.hourlyForecast.forEach(hour => {
        const hourlyItem = document.createElement('div');
        hourlyItem.className = 'hourly-item';
        hourlyItem.setAttribute('tabindex', '0');
        hourlyItem.innerHTML = `
            <div class="hourly-time">${hour.time}</div>
            <div class="hourly-icon weather-icon ${hour.icon}"></div>
            <div class="hourly-temp">${formatTemperature(hour.temp)}</div>
            <div class="hourly-precipitation">${hour.precipitation}%</div>
        `;
        
        hourlyItem.addEventListener('click', () => showHourlyDetails(hour));
        hourlyItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showHourlyDetails(hour);
            }
        });
        hourlyContainer.appendChild(hourlyItem);
    });
}

function displayDailyForecast() {
    const dailyContainer = document.querySelector('#dailyForecast .daily-forecast-grid');
    dailyContainer.innerHTML = '';

    weatherData.dailyForecast.forEach(day => {
        const dailyItem = document.createElement('div');
        dailyItem.className = 'daily-item';
        dailyItem.setAttribute('tabindex', '0');
        dailyItem.innerHTML = `
            <div class="daily-info">
                <div class="daily-day">${day.day}</div>
                <div class="daily-date">${day.date}</div>
            </div>
            <div class="daily-icon weather-icon ${day.icon}"></div>
            <div class="daily-temps">
                <span class="daily-high">${formatTemperature(day.high)}</span>
                <span class="daily-low">${formatTemperature(day.low)}</span>
            </div>
            <div class="daily-condition">${day.condition}</div>
            <div class="daily-precipitation">${day.precipitation}%</div>
        `;
        
        dailyItem.addEventListener('click', () => showDailyDetails(day));
        dailyItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showDailyDetails(day);
            }
        });
        dailyContainer.appendChild(dailyItem);
    });
}

function displaySavedLocations() {
    const savedContainer = document.getElementById('savedLocations');
    savedContainer.innerHTML = '';

    weatherData.savedLocations.forEach(location => {
        const locationItem = document.createElement('div');
        locationItem.className = 'location-item';
        locationItem.setAttribute('tabindex', '0');
        locationItem.innerHTML = `
            <div class="location-info">
                <h4>${location.name}</h4>
            </div>
            <div class="location-weather">
                <div class="location-temp">${formatTemperature(location.temp)}</div>
                <div class="location-icon weather-icon ${location.icon}"></div>
            </div>
        `;
        
        locationItem.addEventListener('click', () => switchLocation(location));
        locationItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchLocation(location);
            }
        });
        savedContainer.appendChild(locationItem);
    });
}

function displayAirQuality() {
    const aqi = weatherData.airQualityData;
    
    document.getElementById('aqiValue').textContent = aqi.aqi;
    document.getElementById('aqiLevel').textContent = aqi.level;
    document.getElementById('aqiDescription').textContent = aqi.description;
    
    // Update AQI color class
    const aqiValue = document.getElementById('aqiValue');
    aqiValue.className = `aqi-value ${getAQIClass(aqi.aqi)}`;
    
    // Update pollutants
    document.getElementById('pm25').textContent = `${aqi.pollutants.pm25} μg/m³`;
    document.getElementById('pm10').textContent = `${aqi.pollutants.pm10} μg/m³`;
    document.getElementById('no2').textContent = `${aqi.pollutants.no2} μg/m³`;
    document.getElementById('o3').textContent = `${aqi.pollutants.o3} μg/m³`;
}

function displayWeatherAlerts() {
    const alertsContainer = document.getElementById('weatherAlerts');
    alertsContainer.innerHTML = '';

    weatherData.weatherAlerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert ${alert.type}`;
        alertElement.innerHTML = `
            <div class="alert-content">
                <h4>${alert.title}</h4>
                <p>${alert.description}</p>
            </div>
            <button class="alert-dismiss" onclick="dismissAlert(this)">&times;</button>
        `;
        
        alertsContainer.appendChild(alertElement);
    });
}

function initializeChart() {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    
    temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weatherData.historicalData.map(d => d.date),
            datasets: [{
                label: 'Temperature',
                data: weatherData.historicalData.map(d => d.temp),
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#1FB8CD',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#1FB8CD',
                    borderWidth: 1,
                    cornerRadius: 8,
                    caretPadding: 10
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 10
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return formatTemperature(value);
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function createWeatherParticles() {
    const particlesContainer = document.getElementById('weatherParticles');
    const condition = weatherData.currentWeather.condition.toLowerCase();
    
    particlesContainer.innerHTML = '';
    
    if (condition.includes('rain')) {
        createRainParticles(particlesContainer);
    } else if (condition.includes('snow')) {
        createSnowParticles(particlesContainer);
    } else if (condition.includes('cloud')) {
        createCloudParticles(particlesContainer);
    }
}

function createRainParticles(container) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle rain';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
        container.appendChild(particle);
    }
}

function createSnowParticles(container) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle snow';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(particle);
    }
}

function createCloudParticles(container) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle cloud';
        particle.style.top = Math.random() * 30 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

// Event handlers
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (currentTheme === 'light') {
        body.setAttribute('data-color-scheme', 'dark');
        themeToggle.textContent = '☀️';
        currentTheme = 'dark';
    } else {
        body.setAttribute('data-color-scheme', 'light');
        themeToggle.textContent = '🌙';
        currentTheme = 'light';
    }
    
    // Re-initialize chart with new theme colors
    if (temperatureChart) {
        temperatureChart.destroy();
        setTimeout(initializeChart, 100);
    }
}

function toggleUnits() {
    const unitsToggle = document.getElementById('unitsToggle');
    
    if (currentUnits === 'celsius') {
        currentUnits = 'fahrenheit';
        unitsToggle.textContent = '°F';
    } else {
        currentUnits = 'celsius';
        unitsToggle.textContent = '°C';
    }
    
    // Update all temperature displays with animation
    animateTemperatureChange();
    setTimeout(() => {
        updateTemperatureDisplays();
    }, 150);
}

function animateTemperatureChange() {
    const tempElements = document.querySelectorAll('.temperature, .metric-value, .hourly-temp, .daily-high, .daily-low, .location-temp');
    tempElements.forEach(element => {
        if (element.textContent.includes('°')) {
            element.classList.add('number-animate', 'changing');
            setTimeout(() => {
                element.classList.remove('changing');
            }, 300);
        }
    });
}

function updateTemperatureDisplays() {
    // Update current temperature
    document.getElementById('currentTemp').textContent = formatTemperature(weatherData.currentWeather.temperature);
    document.getElementById('feelsLike').textContent = formatTemperature(weatherData.currentWeather.feelsLike);
    
    // Update hourly forecast
    displayHourlyForecast();
    
    // Update daily forecast
    displayDailyForecast();
    
    // Update saved locations
    displaySavedLocations();
    
    // Update chart
    if (temperatureChart) {
        temperatureChart.data.datasets[0].data = weatherData.historicalData.map(d => 
            currentUnits === 'celsius' ? d.temp : celsiusToFahrenheit(d.temp)
        );
        temperatureChart.update();
    }
}

function handleSearchInput(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
        hideSearchSuggestions();
        return;
    }
    
    showSearchSuggestions(query);
}

function handleSearchFocus(e) {
    const query = e.target.value.toLowerCase().trim();
    if (query.length >= 2) {
        showSearchSuggestions(query);
    }
}

function handleSearchKeydown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = e.target.value.trim();
        if (query) {
            selectLocation(query);
        }
    } else if (e.key === 'Escape') {
        hideSearchSuggestions();
        e.target.blur();
    }
}

function showSearchSuggestions(query = '') {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    
    if (!query) {
        const searchInput = document.getElementById('locationSearch');
        query = searchInput.value.toLowerCase().trim();
    }
    
    if (query.length < 2) {
        hideSearchSuggestions();
        return;
    }
    
    const filteredCities = sampleCities.filter(city => 
        city.toLowerCase().includes(query)
    ).slice(0, 8);
    
    suggestionsContainer.innerHTML = '';
    
    filteredCities.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = city;
        suggestionItem.addEventListener('click', () => selectLocation(city));
        suggestionsContainer.appendChild(suggestionItem);
    });
    
    if (filteredCities.length > 0) {
        suggestionsContainer.classList.remove('hidden');
    } else {
        hideSearchSuggestions();
    }
}

function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    suggestionsContainer.classList.add('hidden');
}

function selectLocation(city) {
    const locationSearch = document.getElementById('locationSearch');
    locationSearch.value = city;
    hideSearchSuggestions();
    
    // Simulate loading new weather data
    simulateLocationChange(city);
}

function simulateLocationChange(city) {
    // Add loading animation to the hero section
    const heroSection = document.querySelector('.hero-section');
    heroSection.style.opacity = '0.5';
    
    setTimeout(() => {
        // Update location in the current weather data
        weatherData.currentWeather.location = city;
        
        // Randomly adjust some values to simulate different location
        const tempVariation = (Math.random() - 0.5) * 10;
        weatherData.currentWeather.temperature = Math.round(weatherData.currentWeather.temperature + tempVariation);
        
        // Update displays
        displayCurrentWeather();
        displayWeatherMetrics();
        
        heroSection.style.opacity = '1';
        createWeatherParticles();
    }, 1000);
}

function switchForecastTab(tab) {
    const hourlyTab = document.getElementById('hourlyTab');
    const dailyTab = document.getElementById('dailyTab');
    const hourlyContainer = document.getElementById('hourlyForecast');
    const dailyContainer = document.getElementById('dailyForecast');
    
    // Update tab states
    if (tab === 'hourly') {
        hourlyTab.classList.add('active');
        dailyTab.classList.remove('active');
        hourlyContainer.classList.add('active');
        hourlyContainer.classList.remove('hidden');
        dailyContainer.classList.remove('active');
        dailyContainer.classList.add('hidden');
        currentForecastTab = 'hourly';
    } else {
        dailyTab.classList.add('active');
        hourlyTab.classList.remove('active');
        dailyContainer.classList.add('active');
        dailyContainer.classList.remove('hidden');
        hourlyContainer.classList.remove('active');
        hourlyContainer.classList.add('hidden');
        currentForecastTab = 'daily';
    }
}

function switchLocation(location) {
    // Simulate switching to a different saved location
    weatherData.currentWeather.location = location.name;
    weatherData.currentWeather.temperature = location.temp;
    weatherData.currentWeather.condition = location.condition;
    weatherData.currentWeather.icon = location.icon;
    
    displayCurrentWeather();
    displayWeatherMetrics();
    createWeatherParticles();
    
    // Add visual feedback
    const locationItems = document.querySelectorAll('.location-item');
    locationItems.forEach(item => {
        item.style.transform = 'translateX(0)';
        item.style.borderColor = '';
    });
    
    event.currentTarget.style.transform = 'translateX(8px)';
    event.currentTarget.style.borderColor = 'var(--color-primary)';
    
    setTimeout(() => {
        event.currentTarget.style.transform = 'translateX(0)';
        event.currentTarget.style.borderColor = '';
    }, 300);
}

function switchMapLayer(layer, event) {
    const mapLayers = document.querySelectorAll('.map-layer');
    mapLayers.forEach(btn => btn.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
    
    // Simulate map layer change with visual feedback
    const mapDisplay = document.querySelector('.map-display');
    mapDisplay.style.opacity = '0.5';
    
    setTimeout(() => {
        mapDisplay.style.opacity = '1';
        const layerNames = {
            'temperature': 'Temperature Layer',
            'precipitation': 'Precipitation Layer',
            'wind': 'Wind Layer'
        };
        document.querySelector('.map-overlay').textContent = layerNames[layer] || 'Interactive Map';
    }, 300);
}

function showMetricDetails(metric) {
    const modal = document.getElementById('weatherModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const metricData = {
        'feelslike': {
            title: 'Feels Like Temperature',
            content: `<p>The "feels like" temperature is ${formatTemperature(weatherData.currentWeather.feelsLike)}.</p>
                     <p>This takes into account humidity, wind speed, and other factors that affect how the temperature actually feels to your body.</p>
                     <p><strong>Current conditions:</strong></p>
                     <ul>
                       <li>Humidity: ${weatherData.currentWeather.humidity}%</li>
                       <li>Wind Speed: ${formatWindSpeed(weatherData.currentWeather.windSpeed)}</li>
                       <li>Wind Direction: ${weatherData.currentWeather.windDirection}</li>
                     </ul>`
        },
        'humidity': {
            title: 'Humidity',
            content: `<p>Current humidity is ${weatherData.currentWeather.humidity}%.</p>
                     <p>Humidity measures the amount of water vapor in the air.</p>
                     <p><strong>Comfort levels:</strong></p>
                     <ul>
                       <li>30-50%: Comfortable</li>
                       <li>50-70%: Acceptable</li>
                       <li>Above 70%: Uncomfortable</li>
                     </ul>`
        },
        'wind': {
            title: 'Wind Conditions',
            content: `<p>Wind speed is ${formatWindSpeed(weatherData.currentWeather.windSpeed)} from the ${weatherData.currentWeather.windDirection}.</p>
                     <p><strong>Wind scale:</strong></p>
                     <ul>
                       <li>0-1 km/h: Calm</li>
                       <li>2-5 km/h: Light air</li>
                       <li>6-11 km/h: Light breeze</li>
                       <li>12-19 km/h: Gentle breeze</li>
                       <li>20-28 km/h: Moderate breeze</li>
                     </ul>`
        },
        'uv': {
            title: 'UV Index',
            content: `<p>Current UV Index is ${weatherData.currentWeather.uvIndex}.</p>
                     <p><strong>UV Index scale:</strong></p>
                     <ul>
                       <li>0-2: Low</li>
                       <li>3-5: Moderate</li>
                       <li>6-7: High</li>
                       <li>8-10: Very High</li>
                       <li>11+: Extreme</li>
                     </ul>
                     <p>Current level requires sun protection.</p>`
        },
        'visibility': {
            title: 'Visibility',
            content: `<p>Current visibility is ${formatDistance(weatherData.currentWeather.visibility)}.</p>
                     <p>Visibility measures how far you can see clearly.</p>
                     <p><strong>Visibility conditions:</strong></p>
                     <ul>
                       <li>Above 10 km: Excellent</li>
                       <li>5-10 km: Good</li>
                       <li>2-5 km: Moderate</li>
                       <li>Below 2 km: Poor</li>
                     </ul>`
        },
        'pressure': {
            title: 'Air Pressure',
            content: `<p>Current atmospheric pressure is ${weatherData.currentWeather.pressure} mb.</p>
                     <p>Air pressure affects weather patterns and can influence how you feel.</p>
                     <p><strong>Pressure readings:</strong></p>
                     <ul>
                       <li>Above 1020 mb: High pressure (clear weather)</li>
                       <li>1000-1020 mb: Normal</li>
                       <li>Below 1000 mb: Low pressure (storms likely)</li>
                     </ul>`
        }
    };
    
    const data = metricData[metric];
    if (data) {
        modalTitle.textContent = data.title;
        modalContent.innerHTML = data.content;
        modal.classList.remove('hidden');
    }
}

function showHourlyDetails(hour) {
    const modal = document.getElementById('weatherModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = `Weather at ${hour.time}`;
    modalContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div class="weather-icon ${hour.icon}" style="width: 60px; height: 60px; margin: 0 auto 10px;"></div>
            <h3>${formatTemperature(hour.temp)}</h3>
            <p>${hour.condition}</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
                <strong>Precipitation:</strong> ${hour.precipitation}%
            </div>
            <div>
                <strong>Wind:</strong> ${formatWindSpeed(hour.wind)}
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function showDailyDetails(day) {
    const modal = document.getElementById('weatherModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = `${day.day} - ${day.date}`;
    modalContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div class="weather-icon ${day.icon}" style="width: 60px; height: 60px; margin: 0 auto 10px;"></div>
            <h3>${day.condition}</h3>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
                <strong>High:</strong> ${formatTemperature(day.high)}
            </div>
            <div>
                <strong>Low:</strong> ${formatTemperature(day.low)}
            </div>
            <div>
                <strong>Precipitation:</strong> ${day.precipitation}%
            </div>
            <div>
                <strong>Conditions:</strong> ${day.condition}
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function hideModal() {
    const modal = document.getElementById('weatherModal');
    modal.classList.add('hidden');
}

function dismissAlert(button) {
    const alert = button.closest('.alert');
    alert.style.animation = 'slideOutUp 0.3s ease-out';
    setTimeout(() => {
        alert.remove();
    }, 300);
}

function handleKeyboardNavigation(e) {
    if (e.key === 'Escape') {
        hideModal();
        hideSearchSuggestions();
    }
}

// Utility functions
function formatTemperature(temp) {
    const celsius = Math.round(temp);
    const fahrenheit = Math.round(celsiusToFahrenheit(temp));
    return currentUnits === 'celsius' ? `${celsius}°` : `${fahrenheit}°`;
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function formatWindSpeed(speed) {
    const kmh = Math.round(speed);
    const mph = Math.round(speed * 0.621371);
    return currentUnits === 'celsius' ? `${kmh} km/h` : `${mph} mph`;
}

function formatDistance(distance) {
    const km = Math.round(distance);
    const miles = Math.round(distance * 0.621371);
    return currentUnits === 'celsius' ? `${km} km` : `${miles} mi`;
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
}

function formatLastUpdated(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / 60000);
    
    if (diffMinutes < 1) {
        return 'Just now';
    } else if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

function getAQIClass(aqi) {
    if (aqi <= 50) return 'good';
    if (aqi <= 100) return 'moderate';
    return 'unhealthy';
}

// Add CSS animation keyframes for slide out
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-20px); opacity: 0; }
    }
`;
document.head.appendChild(style);
