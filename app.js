// Weather App JavaScript

class WeatherApp {
    constructor() {
        this.currentUnit = 'celsius';
        this.currentTheme = 'light';
        this.currentLocation = 'New York, NY';
        this.favoriteLocations = [];
        this.weatherData = null;
        this.charts = {};
        this.map = null;
        
        this.init();
    }

    async init() {
        // Show loading screen
        this.showLoading();
        
        // Load demo weather data
        this.loadWeatherData();
        
        // Initialize UI components
        this.initializeEventListeners();
        this.initializeTheme();
        this.loadFavoriteLocations();
        
        // Simulate API loading delay
        await this.delay(2000);
        
        // Render initial data
        this.renderCurrentWeather();
        this.renderHourlyForecast();
        this.renderWeeklyForecast();
        this.renderAirQuality();
        this.renderAlerts();
        this.renderCharts();
        this.renderFavorites();
        this.initializeMap();
        
        // Hide loading screen
        this.hideLoading();
        
        // Set weather-based background
        this.updateWeatherBackground();
    }

    loadWeatherData() {
        // Using the provided demo data
        this.weatherData = {
            "currentWeather": {
                "location": "New York, NY",
                "country": "United States",
                "temperature": 22,
                "feelsLike": 25,
                "condition": "Partly Cloudy",
                "description": "Partly cloudy with gentle breeze",
                "icon": "partly-cloudy",
                "humidity": 68,
                "windSpeed": 12,
                "windDirection": "NW",
                "pressure": 1013,
                "uvIndex": 6,
                "visibility": 10,
                "sunrise": "06:42",
                "sunset": "19:28"
            },
            "hourlyForecast": [
                {"time": "14:00", "temp": 22, "condition": "partly-cloudy", "precipitation": 10, "windSpeed": 12},
                {"time": "15:00", "temp": 24, "condition": "partly-cloudy", "precipitation": 15, "windSpeed": 10},
                {"time": "16:00", "temp": 26, "condition": "sunny", "precipitation": 5, "windSpeed": 8},
                {"time": "17:00", "temp": 25, "condition": "sunny", "precipitation": 0, "windSpeed": 9},
                {"time": "18:00", "temp": 23, "condition": "partly-cloudy", "precipitation": 20, "windSpeed": 11},
                {"time": "19:00", "temp": 21, "condition": "cloudy", "precipitation": 35, "windSpeed": 14},
                {"time": "20:00", "temp": 19, "condition": "light-rain", "precipitation": 60, "windSpeed": 16},
                {"time": "21:00", "temp": 18, "condition": "light-rain", "precipitation": 70, "windSpeed": 15},
                {"time": "22:00", "temp": 17, "condition": "cloudy", "precipitation": 40, "windSpeed": 13},
                {"time": "23:00", "temp": 16, "condition": "partly-cloudy", "precipitation": 25, "windSpeed": 10}
            ],
            "weeklyForecast": [
                {"day": "Today", "high": 26, "low": 16, "condition": "partly-cloudy", "precipitation": 30, "description": "Partly cloudy"},
                {"day": "Tomorrow", "high": 28, "low": 18, "condition": "sunny", "precipitation": 10, "description": "Mostly sunny"},
                {"day": "Wednesday", "high": 24, "low": 15, "condition": "light-rain", "precipitation": 80, "description": "Light rain"},
                {"day": "Thursday", "high": 21, "low": 12, "condition": "cloudy", "precipitation": 45, "description": "Overcast"},
                {"day": "Friday", "high": 25, "low": 17, "condition": "sunny", "precipitation": 5, "description": "Clear skies"},
                {"day": "Saturday", "high": 29, "low": 19, "condition": "partly-cloudy", "precipitation": 20, "description": "Partly cloudy"},
                {"day": "Sunday", "high": 27, "low": 18, "condition": "thunderstorm", "precipitation": 90, "description": "Thunderstorms"}
            ],
            "airQuality": {
                "aqi": 42,
                "level": "Good",
                "description": "Air quality is satisfactory for most people",
                "pollutants": {
                    "pm25": 12,
                    "pm10": 18,
                    "o3": 85,
                    "no2": 25,
                    "so2": 5,
                    "co": 0.8
                }
            },
            "alerts": [
                {
                    "type": "Heat Advisory",
                    "severity": "moderate",
                    "description": "Hot temperatures expected through Wednesday. Stay hydrated and avoid prolonged outdoor activities.",
                    "startTime": "2025-09-15T10:00:00Z",
                    "endTime": "2025-09-17T20:00:00Z"
                }
            ],
            "favoriteLocations": [
                {"name": "New York, NY", "temp": 22, "condition": "partly-cloudy"},
                {"name": "Los Angeles, CA", "temp": 28, "condition": "sunny"},
                {"name": "London, UK", "temp": 15, "condition": "light-rain"},
                {"name": "Tokyo, Japan", "temp": 24, "condition": "cloudy"}
            ]
        };
        
        this.favoriteLocations = this.weatherData.favoriteLocations;
    }

    initializeEventListeners() {
        // Theme toggle - fixed event listener
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Unit toggle - fixed event listeners
        document.querySelectorAll('.unit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleUnit(e.target.dataset.unit);
            });
        });
        
        // GPS location
        const gpsBtn = document.getElementById('gps-btn');
        if (gpsBtn) {
            gpsBtn.addEventListener('click', () => this.getCurrentLocation());
        }
        
        // Search functionality - fixed implementation
        const searchInput = document.getElementById('location-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchLocation(e.target.value);
                }
            });
            searchInput.addEventListener('focus', () => {
                if (searchInput.value.length >= 3) {
                    this.handleSearch(searchInput.value);
                }
            });
            searchInput.addEventListener('blur', () => {
                // Delay hiding suggestions to allow clicks
                setTimeout(() => this.hideSuggestions(), 200);
            });
        }
        
        // Favorites functionality
        const favToggle = document.getElementById('favorites-toggle');
        const addFavBtn = document.getElementById('add-favorite-btn');
        const closeModalBtn = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-add');
        const confirmBtn = document.getElementById('confirm-add');
        
        if (favToggle) favToggle.addEventListener('click', () => this.toggleFavorites());
        if (addFavBtn) addFavBtn.addEventListener('click', () => this.showAddLocationModal());
        if (closeModalBtn) closeModalBtn.addEventListener('click', () => this.hideAddLocationModal());
        if (cancelBtn) cancelBtn.addEventListener('click', () => this.hideAddLocationModal());
        if (confirmBtn) confirmBtn.addEventListener('click', () => this.addFavoriteLocation());
        
        // Map layer controls
        document.querySelectorAll('.map-layer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMapLayer(e.target.dataset.layer);
            });
        });
        
        // Weekly forecast click handlers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.weekly-item')) {
                this.showDetailedForecast(e.target.closest('.weekly-item'));
            }
        });
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('weather-app-theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        
        // Apply theme to document root
        document.documentElement.setAttribute('data-color-scheme', theme);
        document.body.setAttribute('data-color-scheme', theme);
        
        // Update theme icon
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
        
        // Save theme preference
        localStorage.setItem('weather-app-theme', theme);
        
        // Update charts to match theme
        setTimeout(() => {
            this.renderCharts();
        }, 100);
    }

    toggleUnit(unit) {
        if (unit === this.currentUnit) return;
        
        this.currentUnit = unit;
        
        // Update active button states
        document.querySelectorAll('.unit-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.unit === unit) {
                btn.classList.add('active');
            }
        });
        
        // Update all temperature displays
        this.updateTemperatureDisplays();
    }

    updateTemperatureDisplays() {
        // Update current temperature
        const currentTemp = document.getElementById('current-temp');
        const feelsLikeTemp = document.getElementById('feels-like-temp');
        const tempUnits = document.querySelectorAll('.temp-unit');
        
        if (currentTemp) {
            const current = this.convertTemperature(this.weatherData.currentWeather.temperature);
            currentTemp.textContent = Math.round(current);
        }
        
        if (feelsLikeTemp) {
            const feelsLike = this.convertTemperature(this.weatherData.currentWeather.feelsLike);
            feelsLikeTemp.textContent = `${Math.round(feelsLike)}°${this.currentUnit === 'celsius' ? 'C' : 'F'}`;
        }
        
        tempUnits.forEach(unit => {
            unit.textContent = `°${this.currentUnit === 'celsius' ? 'C' : 'F'}`;
        });
        
        // Update hourly and weekly forecasts
        this.renderHourlyForecast();
        this.renderWeeklyForecast();
        this.renderCharts();
        this.renderFavorites();
    }

    convertTemperature(celsius) {
        return this.currentUnit === 'fahrenheit' ? (celsius * 9/5) + 32 : celsius;
    }

    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateWeatherBackground() {
        const condition = this.weatherData.currentWeather.icon;
        const hour = new Date().getHours();
        const isNight = hour < 6 || hour > 20;
        
        document.body.setAttribute('data-weather-condition', condition);
        document.body.setAttribute('data-time', isNight ? 'night' : 'day');
    }

    renderCurrentWeather() {
        const { currentWeather } = this.weatherData;
        
        const elements = {
            'location-name': currentWeather.location,
            'weather-description': currentWeather.description,
            'humidity': `${currentWeather.humidity}%`,
            'wind-speed': `${currentWeather.windSpeed} km/h ${currentWeather.windDirection}`,
            'pressure': `${currentWeather.pressure} hPa`,
            'visibility': `${currentWeather.visibility} km`,
            'sunrise': currentWeather.sunrise
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        // UV Index with color coding
        const uvElement = document.getElementById('uv-index');
        if (uvElement) {
            uvElement.textContent = currentWeather.uvIndex;
            uvElement.className = `detail-value uv-${this.getUVLevel(currentWeather.uvIndex)}`;
        }
        
        // Update temperature displays
        this.updateTemperatureDisplays();
    }

    getUVLevel(uvIndex) {
        if (uvIndex <= 2) return 'low';
        if (uvIndex <= 7) return 'moderate';
        return 'high';
    }

    renderHourlyForecast() {
        const container = document.getElementById('hourly-forecast-scroll');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.weatherData.hourlyForecast.forEach(hour => {
            const temp = Math.round(this.convertTemperature(hour.temp));
            const item = document.createElement('div');
            item.className = 'hourly-item';
            item.innerHTML = `
                <span class="hourly-time">${hour.time}</span>
                <span class="hourly-icon">${this.getWeatherIcon(hour.condition)}</span>
                <span class="hourly-temp">${temp}°</span>
                <span class="hourly-precipitation">${hour.precipitation}%</span>
            `;
            container.appendChild(item);
        });
    }

    renderWeeklyForecast() {
        const container = document.getElementById('weekly-forecast-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.weatherData.weeklyForecast.forEach((day, index) => {
            const high = Math.round(this.convertTemperature(day.high));
            const low = Math.round(this.convertTemperature(day.low));
            
            const item = document.createElement('div');
            item.className = 'weekly-item';
            item.setAttribute('data-day-index', index);
            item.innerHTML = `
                <span class="weekly-day">${day.day}</span>
                <span class="weekly-icon">${this.getWeatherIcon(day.condition)}</span>
                <span class="weekly-description">${day.description}</span>
                <div class="weekly-temps">
                    <span class="weekly-high">${high}°</span>
                    <span class="weekly-low">${low}°</span>
                </div>
                <span class="weekly-precipitation">${day.precipitation}%</span>
            `;
            container.appendChild(item);
        });
    }

    renderAirQuality() {
        const { airQuality } = this.weatherData;
        
        const elements = {
            'aqi-value': airQuality.aqi,
            'aqi-level': airQuality.level,
            'aqi-description': airQuality.description
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        // Update AQI badge class
        const aqiBadge = document.querySelector('.aqi-badge');
        if (aqiBadge) {
            aqiBadge.className = `aqi-badge aqi-${airQuality.level.toLowerCase()}`;
        }
        
        // Update pollutants
        const pollutantsGrid = document.querySelector('.pollutants-grid');
        if (pollutantsGrid) {
            pollutantsGrid.innerHTML = `
                <div class="pollutant-item">
                    <span class="pollutant-name">PM2.5</span>
                    <span class="pollutant-value">${airQuality.pollutants.pm25} μg/m³</span>
                </div>
                <div class="pollutant-item">
                    <span class="pollutant-name">PM10</span>
                    <span class="pollutant-value">${airQuality.pollutants.pm10} μg/m³</span>
                </div>
                <div class="pollutant-item">
                    <span class="pollutant-name">O₃</span>
                    <span class="pollutant-value">${airQuality.pollutants.o3} μg/m³</span>
                </div>
            `;
        }
    }

    renderAlerts() {
        const alertsSection = document.getElementById('alerts-section');
        
        if (this.weatherData.alerts.length === 0) {
            if (alertsSection) alertsSection.style.display = 'none';
            return;
        }
        
        if (alertsSection) alertsSection.style.display = 'block';
        // Alert is already in HTML, just update if needed
    }

    renderCharts() {
        this.renderHourlyChart();
        this.renderTemperatureChart();
        this.renderPrecipitationChart();
        this.renderWindChart();
        this.renderHumidityChart();
    }

    renderHourlyChart() {
        const canvas = document.getElementById('hourly-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts.hourly) {
            this.charts.hourly.destroy();
        }
        
        const data = this.weatherData.hourlyForecast.map(h => this.convertTemperature(h.temp));
        const labels = this.weatherData.hourlyForecast.map(h => h.time);
        
        this.charts.hourly = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Temperature (°${this.currentUnit === 'celsius' ? 'C' : 'F'})`,
                    data: data,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        }
                    }
                }
            }
        });
    }

    renderTemperatureChart() {
        const canvas = document.getElementById('temperature-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts.temperature) {
            this.charts.temperature.destroy();
        }
        
        const highs = this.weatherData.weeklyForecast.map(d => this.convertTemperature(d.high));
        const lows = this.weatherData.weeklyForecast.map(d => this.convertTemperature(d.low));
        const labels = this.weatherData.weeklyForecast.map(d => d.day);
        
        this.charts.temperature = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'High',
                        data: highs,
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        fill: false
                    },
                    {
                        label: 'Low',
                        data: lows,
                        borderColor: '#5D878F',
                        backgroundColor: 'rgba(93, 135, 143, 0.1)',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'var(--color-text)'
                        }
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        }
                    }
                }
            }
        });
    }

    renderPrecipitationChart() {
        const canvas = document.getElementById('precipitation-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts.precipitation) {
            this.charts.precipitation.destroy();
        }
        
        const data = this.weatherData.weeklyForecast.map(d => d.precipitation);
        const labels = this.weatherData.weeklyForecast.map(d => d.day);
        
        this.charts.precipitation = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Precipitation (%)',
                    data: data,
                    backgroundColor: '#1FB8CD',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        }
                    }
                }
            }
        });
    }

    renderWindChart() {
        const canvas = document.getElementById('wind-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts.wind) {
            this.charts.wind.destroy();
        }
        
        const data = this.weatherData.hourlyForecast.map(h => h.windSpeed);
        const labels = this.weatherData.hourlyForecast.map(h => h.time);
        
        this.charts.wind = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Wind Speed (km/h)',
                    data: data,
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        }
                    }
                }
            }
        });
    }

    renderHumidityChart() {
        const canvas = document.getElementById('humidity-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts.humidity) {
            this.charts.humidity.destroy();
        }
        
        // Generate sample humidity data
        const humidityData = this.weatherData.hourlyForecast.map(() => 
            Math.floor(Math.random() * 30) + 50 // Random humidity between 50-80%
        );
        const labels = this.weatherData.hourlyForecast.map(h => h.time);
        
        this.charts.humidity = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Humidity (%)',
                    data: humidityData,
                    backgroundColor: '#5D878F',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        }
                    }
                }
            }
        });
    }

    initializeMap() {
        const mapElement = document.getElementById('weather-map');
        if (!mapElement) return;
        
        try {
            // Initialize Leaflet map centered on New York
            this.map = L.map(mapElement).setView([40.7128, -74.0060], 10);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);
            
            // Add marker for current location
            L.marker([40.7128, -74.0060])
                .addTo(this.map)
                .bindPopup('New York, NY<br>22°C - Partly Cloudy')
                .openPopup();
            
            // Add weather overlay (mock)
            this.addWeatherOverlay('temperature');
        } catch (error) {
            console.warn('Map initialization failed:', error);
        }
    }

    addWeatherOverlay(layer) {
        // Mock weather overlay - in real app, this would use weather API tiles
        console.log(`Switching to ${layer} layer`);
        
        // Update active button
        document.querySelectorAll('.map-layer-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.layer === layer);
        });
    }

    switchMapLayer(layer) {
        this.addWeatherOverlay(layer);
    }

    renderFavorites() {
        const container = document.getElementById('favorites-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.favoriteLocations.forEach((location, index) => {
            const temp = Math.round(this.convertTemperature(location.temp));
            const item = document.createElement('div');
            item.className = 'favorite-item';
            item.innerHTML = `
                <div class="favorite-info">
                    <div class="favorite-name">${location.name}</div>
                    <div class="favorite-temp">${temp}°${this.currentUnit === 'celsius' ? 'C' : 'F'}</div>
                </div>
                <span class="favorite-icon">${this.getWeatherIcon(location.condition)}</span>
            `;
            
            item.addEventListener('click', () => this.switchToLocation(location.name));
            container.appendChild(item);
        });
    }

    loadFavoriteLocations() {
        const saved = localStorage.getItem('weather-app-favorites');
        if (saved) {
            try {
                this.favoriteLocations = JSON.parse(saved);
            } catch (error) {
                console.warn('Failed to load saved favorites:', error);
            }
        }
    }

    saveFavoriteLocations() {
        try {
            localStorage.setItem('weather-app-favorites', JSON.stringify(this.favoriteLocations));
        } catch (error) {
            console.warn('Failed to save favorites:', error);
        }
    }

    toggleFavorites() {
        const sidebar = document.getElementById('favorites-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    showAddLocationModal() {
        const modal = document.getElementById('add-location-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideAddLocationModal() {
        const modal = document.getElementById('add-location-modal');
        const input = document.getElementById('new-location-input');
        
        if (modal) modal.classList.add('hidden');
        if (input) input.value = '';
    }

    addFavoriteLocation() {
        const input = document.getElementById('new-location-input');
        if (!input) return;
        
        const locationName = input.value.trim();
        
        if (!locationName) {
            alert('Please enter a location name.');
            return;
        }
        
        // Check if already exists
        if (this.favoriteLocations.some(loc => loc.name.toLowerCase() === locationName.toLowerCase())) {
            alert('Location already in favorites!');
            return;
        }
        
        // Add new location (with mock data)
        const newLocation = {
            name: locationName,
            temp: Math.floor(Math.random() * 20) + 10, // Random temp
            condition: 'partly-cloudy'
        };
        
        this.favoriteLocations.push(newLocation);
        this.saveFavoriteLocations();
        this.renderFavorites();
        this.hideAddLocationModal();
        
        alert(`${locationName} added to favorites!`);
    }

    switchToLocation(locationName) {
        this.currentLocation = locationName;
        
        // Update the location display
        const locationElement = document.getElementById('location-name');
        if (locationElement) {
            locationElement.textContent = locationName;
        }
        
        // Close sidebar
        const sidebar = document.getElementById('favorites-sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
        
        // In a real app, this would fetch new weather data
        console.log(`Switched to ${locationName}`);
        alert(`Switched to ${locationName} (Demo mode - weather data would update in real app)`);
    }

    getCurrentLocation() {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser.');
            return;
        }
        
        const button = document.getElementById('gps-btn');
        if (button) {
            button.textContent = '⏳';
            button.disabled = true;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`Current location: ${latitude}, ${longitude}`);
                
                // Reset button
                if (button) {
                    button.innerHTML = '<span class="location-icon">📍</span>';
                    button.disabled = false;
                }
                
                // In a real app, reverse geocode and fetch weather
                alert('Location detected! (Demo mode - would fetch weather for your location)');
            },
            (error) => {
                console.error('Error getting location:', error);
                
                // Reset button
                if (button) {
                    button.innerHTML = '<span class="location-icon">📍</span>';
                    button.disabled = false;
                }
                
                alert('Unable to get your location. Please search manually.');
            }
        );
    }

    handleSearch(query) {
        const suggestionsContainer = document.getElementById('search-suggestions');
        
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }
        
        // Mock search suggestions with more realistic city data
        const allCities = [
            'New York, NY, USA',
            'Los Angeles, CA, USA',
            'Chicago, IL, USA',
            'Houston, TX, USA',
            'Phoenix, AZ, USA',
            'London, England, UK',
            'Manchester, England, UK',
            'Birmingham, England, UK',
            'Paris, France',
            'Lyon, France',
            'Marseille, France',
            'Tokyo, Japan',
            'Osaka, Japan',
            'Kyoto, Japan',
            'Sydney, Australia',
            'Melbourne, Australia',
            'Toronto, Canada',
            'Vancouver, Canada',
            'Berlin, Germany',
            'Munich, Germany',
            'Rome, Italy',
            'Milan, Italy'
        ];
        
        const suggestions = allCities.filter(city => 
            city.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6); // Limit to 6 suggestions
        
        this.showSuggestions(suggestions);
    }

    showSuggestions(suggestions) {
        const container = document.getElementById('search-suggestions');
        if (!container) return;
        
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        container.innerHTML = '';
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = suggestion;
            item.addEventListener('click', () => {
                this.searchLocation(suggestion);
            });
            container.appendChild(item);
        });
        
        container.style.display = 'block';
    }

    hideSuggestions() {
        const container = document.getElementById('search-suggestions');
        if (container) {
            container.style.display = 'none';
        }
    }

    searchLocation(location) {
        const searchInput = document.getElementById('location-search');
        if (searchInput) {
            searchInput.value = location;
        }
        
        this.switchToLocation(location);
        this.hideSuggestions();
    }

    showDetailedForecast(dayElement) {
        const dayIndex = dayElement.dataset.dayIndex;
        const dayData = this.weatherData.weeklyForecast[dayIndex];
        
        if (dayData) {
            const high = Math.round(this.convertTemperature(dayData.high));
            const low = Math.round(this.convertTemperature(dayData.low));
            const unit = this.currentUnit === 'celsius' ? 'C' : 'F';
            
            alert(`${dayData.day} Forecast:\n${dayData.description}\nHigh: ${high}°${unit}\nLow: ${low}°${unit}\nPrecipitation: ${dayData.precipitation}%`);
        }
    }

    getWeatherIcon(condition) {
        const icons = {
            'sunny': '☀️',
            'partly-cloudy': '⛅',
            'cloudy': '☁️',
            'light-rain': '🌦️',
            'rain': '🌧️',
            'thunderstorm': '⛈️',
            'snow': '❄️',
            'fog': '🌫️'
        };
        
        return icons[condition] || '🌤️';
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherApp = new WeatherApp();
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
