// Weather data - normally this would come from an API
const weatherData = {
  "currentWeather": {
    "location": "New York, NY",
    "country": "United States",
    "temperature": 22,
    "feelsLike": 25,
    "condition": "Partly Cloudy",
    "description": "Partly cloudy with gentle breeze",
    "humidity": 65,
    "windSpeed": 12,
    "windDirection": "NW",
    "uvIndex": 6,
    "airQuality": {
      "aqi": 45,
      "category": "Good",
      "description": "Air quality is satisfactory"
    },
    "pressure": 1013,
    "visibility": 16,
    "sunrise": "06:42",
    "sunset": "19:28",
    "lastUpdated": "2025-09-14T17:41:00Z"
  },
  "hourlyForecast": [
    {"time": "18:00", "temp": 22, "condition": "Partly Cloudy", "precipitation": 10, "windSpeed": 12},
    {"time": "19:00", "temp": 21, "condition": "Partly Cloudy", "precipitation": 15, "windSpeed": 11},
    {"time": "20:00", "temp": 20, "condition": "Cloudy", "precipitation": 20, "windSpeed": 10},
    {"time": "21:00", "temp": 19, "condition": "Cloudy", "precipitation": 25, "windSpeed": 9},
    {"time": "22:00", "temp": 18, "condition": "Light Rain", "precipitation": 60, "windSpeed": 8},
    {"time": "23:00", "temp": 17, "condition": "Light Rain", "precipitation": 70, "windSpeed": 7},
    {"time": "00:00", "temp": 16, "condition": "Rain", "precipitation": 80, "windSpeed": 8},
    {"time": "01:00", "temp": 16, "condition": "Rain", "precipitation": 75, "windSpeed": 9},
    {"time": "02:00", "temp": 15, "condition": "Light Rain", "precipitation": 50, "windSpeed": 7},
    {"time": "03:00", "temp": 15, "condition": "Cloudy", "precipitation": 30, "windSpeed": 6},
    {"time": "04:00", "temp": 14, "condition": "Cloudy", "precipitation": 20, "windSpeed": 6},
    {"time": "05:00", "temp": 14, "condition": "Partly Cloudy", "precipitation": 10, "windSpeed": 7},
    {"time": "06:00", "temp": 15, "condition": "Partly Cloudy", "precipitation": 5, "windSpeed": 8},
    {"time": "07:00", "temp": 17, "condition": "Sunny", "precipitation": 0, "windSpeed": 9},
    {"time": "08:00", "temp": 19, "condition": "Sunny", "precipitation": 0, "windSpeed": 10},
    {"time": "09:00", "temp": 21, "condition": "Sunny", "precipitation": 0, "windSpeed": 11},
    {"time": "10:00", "temp": 23, "condition": "Sunny", "precipitation": 0, "windSpeed": 12},
    {"time": "11:00", "temp": 25, "condition": "Sunny", "precipitation": 0, "windSpeed": 13},
    {"time": "12:00", "temp": 26, "condition": "Partly Cloudy", "precipitation": 5, "windSpeed": 14},
    {"time": "13:00", "temp": 27, "condition": "Partly Cloudy", "precipitation": 10, "windSpeed": 15},
    {"time": "14:00", "temp": 28, "condition": "Partly Cloudy", "precipitation": 15, "windSpeed": 14},
    {"time": "15:00", "temp": 27, "condition": "Partly Cloudy", "precipitation": 20, "windSpeed": 13},
    {"time": "16:00", "temp": 26, "condition": "Cloudy", "precipitation": 25, "windSpeed": 12},
    {"time": "17:00", "temp": 24, "condition": "Cloudy", "precipitation": 30, "windSpeed": 11}
  ],
  "weeklyForecast": [
    {"day": "Today", "date": "Sep 14", "high": 28, "low": 14, "condition": "Partly Cloudy", "precipitation": 30},
    {"day": "Sunday", "date": "Sep 15", "high": 25, "low": 12, "condition": "Rain", "precipitation": 80},
    {"day": "Monday", "date": "Sep 16", "high": 20, "low": 8, "condition": "Cloudy", "precipitation": 40},
    {"day": "Tuesday", "date": "Sep 17", "high": 23, "low": 10, "condition": "Sunny", "precipitation": 10},
    {"day": "Wednesday", "date": "Sep 18", "high": 26, "low": 13, "condition": "Sunny", "precipitation": 5},
    {"day": "Thursday", "date": "Sep 19", "high": 24, "low": 11, "condition": "Partly Cloudy", "precipitation": 20},
    {"day": "Friday", "date": "Sep 20", "high": 22, "low": 9, "condition": "Cloudy", "precipitation": 35}
  ]
};

// Sample weather data for different cities
const sampleCityData = {
  "London, UK": {
    temperature: 15, feelsLike: 13, condition: "Cloudy", 
    description: "Overcast with light winds", country: "United Kingdom"
  },
  "Tokyo, Japan": {
    temperature: 28, feelsLike: 32, condition: "Sunny", 
    description: "Clear skies with warm temperatures", country: "Japan"
  },
  "Sydney, Australia": {
    temperature: 20, feelsLike: 18, condition: "Partly Cloudy", 
    description: "Partly cloudy with ocean breeze", country: "Australia"
  }
};

// App state
let currentUnit = 'C';
let currentTheme = 'light';
let temperatureChart = null;
let precipitationChart = null;

// Weather condition icons mapping
const weatherIcons = {
  'Sunny': '☀️',
  'Partly Cloudy': '⛅',
  'Cloudy': '☁️',
  'Light Rain': '🌦️',
  'Rain': '🌧️',
  'Storm': '⛈️',
  'Snow': '🌨️',
  'Fog': '🌫️'
};

// Utility functions
function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9/5) + 32);
}

function fahrenheitToCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) * 5/9);
}

function getWindDirection(direction) {
  const directions = {
    'N': 'North', 'NE': 'Northeast', 'E': 'East', 'SE': 'Southeast',
    'S': 'South', 'SW': 'Southwest', 'W': 'West', 'NW': 'Northwest'
  };
  return directions[direction] || direction;
}

function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

// Theme management
function initTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  currentTheme = prefersDark ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  updateThemeToggle();
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  updateThemeToggle();
  
  // Update charts with new theme colors
  if (temperatureChart) {
    updateCharts();
  }
}

function updateThemeToggle() {
  const themeIcon = document.querySelector('.theme-icon');
  themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

// Weather background management
function updateWeatherBackground() {
  const condition = weatherData.currentWeather.condition.toLowerCase();
  const body = document.body;
  
  // Remove existing weather classes
  body.classList.remove('sunny', 'partly-cloudy', 'cloudy', 'rainy', 'stormy');
  
  // Add appropriate class based on condition
  if (condition.includes('sunny') || condition.includes('clear')) {
    body.classList.add('sunny');
  } else if (condition.includes('partly') || condition.includes('few')) {
    body.classList.add('partly-cloudy');
  } else if (condition.includes('rain') || condition.includes('drizzle')) {
    body.classList.add('rainy');
  } else if (condition.includes('storm') || condition.includes('thunder')) {
    body.classList.add('stormy');
  } else {
    body.classList.add('partly-cloudy'); // Default
  }
}

// Temperature unit management
function toggleUnit() {
  currentUnit = currentUnit === 'C' ? 'F' : 'C';
  
  // Update unit toggle buttons
  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.unit === currentUnit);
  });
  
  // Update all temperature displays
  updateTemperatureDisplay();
  updateWeeklyForecast();
  updateCharts();
}

function updateTemperatureDisplay() {
  const currentTemp = document.getElementById('currentTemp');
  const feelsLike = document.getElementById('feelsLike');
  
  let temp = weatherData.currentWeather.temperature;
  let feels = weatherData.currentWeather.feelsLike;
  
  if (currentUnit === 'F') {
    temp = celsiusToFahrenheit(temp);
    feels = celsiusToFahrenheit(feels);
  }
  
  currentTemp.textContent = `${temp}°`;
  feelsLike.textContent = `${feels}°`;
}

// Main weather display update
function updateCurrentWeather() {
  const data = weatherData.currentWeather;
  
  // Location info
  const locationElement = document.getElementById('currentLocation');
  const countryElement = document.querySelector('.current-country');
  
  if (locationElement) locationElement.textContent = data.location;
  if (countryElement) countryElement.textContent = data.country;
  
  // Weather condition
  const conditionElement = document.getElementById('weatherCondition');
  const descElement = document.getElementById('weatherDesc');
  const iconElement = document.getElementById('weatherIcon');
  
  if (conditionElement) conditionElement.textContent = data.condition;
  if (descElement) descElement.textContent = data.description;
  if (iconElement) iconElement.textContent = weatherIcons[data.condition] || '⛅';
  
  // Metrics
  const humidityElement = document.getElementById('humidity');
  const progressElement = document.querySelector('.progress-fill');
  
  if (humidityElement) humidityElement.textContent = `${data.humidity}%`;
  if (progressElement) progressElement.style.width = `${data.humidity}%`;
  
  const windSpeedElement = document.getElementById('windSpeed');
  const windDirectionElement = document.getElementById('windDirection');
  
  if (windSpeedElement) windSpeedElement.textContent = `${data.windSpeed} km/h`;
  if (windDirectionElement) windDirectionElement.textContent = getWindDirection(data.windDirection);
  
  const uvElement = document.getElementById('uvIndex');
  if (uvElement) uvElement.textContent = data.uvIndex;
  
  const aqiElement = document.getElementById('aqiValue');
  if (aqiElement) aqiElement.textContent = data.airQuality.aqi;
  
  const sunriseElement = document.getElementById('sunrise');
  const sunsetElement = document.getElementById('sunset');
  
  if (sunriseElement) sunriseElement.textContent = formatTime(data.sunrise);
  if (sunsetElement) sunsetElement.textContent = `Sunset ${formatTime(data.sunset)}`;
  
  const pressureElement = document.getElementById('pressure');
  if (pressureElement) pressureElement.textContent = `${data.pressure} hPa`;
  
  // Last updated
  const lastUpdatedElement = document.getElementById('lastUpdated');
  if (lastUpdatedElement) {
    const lastUpdated = new Date(data.lastUpdated);
    lastUpdatedElement.textContent = lastUpdated.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
  
  updateTemperatureDisplay();
  updateWeatherBackground();
}

// Weekly forecast update
function updateWeeklyForecast() {
  const grid = document.getElementById('weeklyGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  weatherData.weeklyForecast.forEach(day => {
    let high = day.high;
    let low = day.low;
    
    if (currentUnit === 'F') {
      high = celsiusToFahrenheit(high);
      low = celsiusToFahrenheit(low);
    }
    
    const card = document.createElement('div');
    card.className = 'forecast-card fade-in';
    card.innerHTML = `
      <div class="forecast-day">${day.day}</div>
      <div class="forecast-date">${day.date}</div>
      <div class="forecast-icon">${weatherIcons[day.condition] || '⛅'}</div>
      <div class="forecast-temps">
        <span class="forecast-high">${high}°</span>
        <span class="forecast-low">${low}°</span>
      </div>
      <div class="forecast-condition">${day.condition}</div>
      <div class="forecast-precipitation">💧 ${day.precipitation}%</div>
    `;
    grid.appendChild(card);
  });
}

// Chart creation and management
function createCharts() {
  createTemperatureChart();
  createPrecipitationChart();
}

function createTemperatureChart() {
  const ctx = document.getElementById('temperatureChart');
  if (!ctx) return;
  
  const hours = weatherData.hourlyForecast.map(h => h.time);
  const temps = weatherData.hourlyForecast.map(h => {
    return currentUnit === 'F' ? celsiusToFahrenheit(h.temp) : h.temp;
  });
  
  if (temperatureChart) {
    temperatureChart.destroy();
  }
  
  temperatureChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [{
        label: `Temperature (°${currentUnit})`,
        data: temps,
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#1FB8CD',
        pointBorderColor: '#ffffff',
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
          display: true,
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim(),
            font: {
              family: 'FKGroteskNeue, Geist, Inter, sans-serif'
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim(),
            drawOnChartArea: true,
            drawTicks: false
          },
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
            font: {
              family: 'FKGroteskNeue, Geist, Inter, sans-serif'
            }
          }
        },
        y: {
          grid: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim(),
            drawOnChartArea: true,
            drawTicks: false
          },
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
            font: {
              family: 'FKGroteskNeue, Geist, Inter, sans-serif'
            },
            callback: function(value) {
              return value + '°';
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

function createPrecipitationChart() {
  const ctx = document.getElementById('precipitationChart');
  if (!ctx) return;
  
  const hours = weatherData.hourlyForecast.map(h => h.time);
  const precipitation = weatherData.hourlyForecast.map(h => h.precipitation);
  
  if (precipitationChart) {
    precipitationChart.destroy();
  }
  
  precipitationChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hours,
      datasets: [{
        label: 'Precipitation (%)',
        data: precipitation,
        backgroundColor: precipitation.map(p => {
          if (p >= 70) return '#B4413C';
          if (p >= 40) return '#FFC185';
          if (p >= 20) return '#1FB8CD';
          return 'rgba(31, 184, 205, 0.3)';
        }),
        borderColor: '#1FB8CD',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim(),
            font: {
              family: 'FKGroteskNeue, Geist, Inter, sans-serif'
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
            font: {
              family: 'FKGroteskNeue, Geist, Inter, sans-serif'
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim(),
            drawOnChartArea: true,
            drawTicks: false
          },
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
            font: {
              family: 'FKGroteskNeue, Geist, Inter, sans-serif'
            },
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}

function updateCharts() {
  createTemperatureChart();
  createPrecipitationChart();
}

// Search and location functionality
function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim();
  
  if (query) {
    console.log('Searching for:', query);
    
    // Show loading state
    document.body.classList.add('loading');
    
    // Simulate API call delay
    setTimeout(() => {
      // Update weather data for the searched city
      updateLocationWeather(query);
      
      // Clear search
      searchInput.value = '';
      
      // Remove loading state
      document.body.classList.remove('loading');
      
      // Update favorite button states
      updateFavoriteButtons(query);
    }, 1000);
  }
}

function updateLocationWeather(location) {
  // Update current weather data
  weatherData.currentWeather.location = location;
  
  // Check if we have sample data for this city
  if (sampleCityData[location]) {
    const cityData = sampleCityData[location];
    weatherData.currentWeather.temperature = cityData.temperature;
    weatherData.currentWeather.feelsLike = cityData.feelsLike;
    weatherData.currentWeather.condition = cityData.condition;
    weatherData.currentWeather.description = cityData.description;
    weatherData.currentWeather.country = cityData.country;
  }
  
  // Update the display
  updateCurrentWeather();
  updateWeeklyForecast();
  updateCharts();
}

function updateFavoriteButtons(selectedLocation) {
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const btnLocation = btn.dataset.location;
    btn.classList.toggle('active', btnLocation === selectedLocation);
  });
}

function handleLocationDetection() {
  console.log('Detecting current location...');
  
  // Show loading state
  document.body.classList.add('loading');
  
  // Simulate geolocation
  setTimeout(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location detected:', position.coords);
          // In a real app, would reverse geocode and fetch weather
          
          // For demo, just update to New York
          updateLocationWeather('New York, NY');
          updateFavoriteButtons('New York, NY');
          
          // Remove loading state
          document.body.classList.remove('loading');
        },
        (error) => {
          console.error('Location detection failed:', error);
          
          // Remove loading state
          document.body.classList.remove('loading');
        }
      );
    } else {
      console.log('Geolocation not supported');
      
      // Remove loading state
      document.body.classList.remove('loading');
    }
  }, 500);
}

function handleFavoriteSelection(location) {
  console.log('Selected favorite location:', location);
  
  // Show loading state
  document.body.classList.add('loading');
  
  // Simulate location change
  setTimeout(() => {
    updateLocationWeather(location);
    updateFavoriteButtons(location);
    
    // Remove loading state
    document.body.classList.remove('loading');
  }, 800);
}

function handleMapLayerToggle(layer) {
  console.log('Selected map layer:', layer);
  
  // Update active state
  document.querySelectorAll('.map-layer-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

// Event listeners
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Temperature unit toggle
  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleUnit();
    });
  });
  
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }
  
  // Location detection
  const locationBtn = document.getElementById('locationBtn');
  if (locationBtn) {
    locationBtn.addEventListener('click', handleLocationDetection);
  }
  
  // Favorite locations
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleFavoriteSelection(btn.dataset.location);
    });
  });
  
  // Map layer toggles
  document.querySelectorAll('.map-layer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      handleMapLayerToggle(btn.dataset.layer);
    });
  });
  
  // Social sharing (placeholder)
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Social sharing not implemented in demo');
    });
  });
  
  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    // Escape key to clear search
    if (e.key === 'Escape') {
      const searchInput = document.getElementById('searchInput');
      if (searchInput && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.blur();
      }
    }
    
    // Theme toggle with keyboard shortcut (Ctrl/Cmd + Shift + T)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
      e.preventDefault();
      toggleTheme();
    }
  });
}

// Responsive behavior
function handleResize() {
  // Update charts on resize
  if (temperatureChart) {
    temperatureChart.resize();
  }
  if (precipitationChart) {
    precipitationChart.resize();
  }
}

// Initialize app
function initApp() {
  // Initialize theme
  initTheme();
  
  // Update weather display
  updateCurrentWeather();
  updateWeeklyForecast();
  
  // Setup event listeners
  setupEventListeners();
  
  // Create charts after a short delay to ensure DOM is ready
  setTimeout(() => {
    createCharts();
  }, 100);
  
  // Setup resize handler
  window.addEventListener('resize', handleResize);
  
  // Add fade-in animation to main elements
  setTimeout(() => {
    document.querySelectorAll('.main-dashboard, .metrics-grid, .charts-section').forEach(el => {
      el.classList.add('fade-in');
    });
  }, 200);
  
  console.log('WeatherTech app initialized successfully');
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
    document.body.classList.add('paused');
  } else {
    // Resume animations when tab becomes visible
    document.body.classList.remove('paused');
  }
});

// Export functions for testing (if needed)
window.WeatherApp = {
  toggleTheme,
  toggleUnit,
  updateCurrentWeather,
  handleSearch,
  handleLocationDetection
};
