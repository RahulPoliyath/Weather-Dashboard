// Weather Dashboard Application
class WeatherDashboard {
    constructor() {
        this.currentUnit = 'C';
        this.currentLocation = { lat: 40.7128, lon: -74.0060, name: 'New York, NY' };
        this.chart = null;
        this.refreshInterval = null;
        
        // API endpoints
        this.apiEndpoints = {
            forecast: 'https://api.open-meteo.com/v1/forecast',
            geocoding: 'https://geocoding-api.open-meteo.com/v1/search'
        };
        
        // Ensure DOM is ready before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing Weather Dashboard...');
        this.bindEvents();
        this.updateTime();
        this.loadCurrentLocation();
        this.startAutoRefresh();
        
        // Initial load with sample data as fallback
        this.loadSampleData();
    }

    bindEvents() {
        console.log('Binding events...');
        
        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const locationSearch = document.getElementById('locationSearch');
        const locationBtn = document.getElementById('locationBtn');
        const unitToggle = document.getElementById('unitToggle');
        const toastClose = document.getElementById('toastClose');
        const zoomIn = document.getElementById('zoomIn');
        const zoomOut = document.getElementById('zoomOut');

        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Search button clicked');
                this.searchLocation();
            });
        }

        if (locationSearch) {
            locationSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('Enter pressed in search');
                    this.searchLocation();
                }
            });

            // Add input event for debugging
            locationSearch.addEventListener('input', (e) => {
                console.log('Input value:', e.target.value);
            });
        }
        
        // Geolocation
        if (locationBtn) {
            locationBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Location button clicked');
                this.getCurrentLocation();
            });
        }
        
        // Unit toggle
        if (unitToggle) {
            unitToggle.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Unit toggle clicked, current unit:', this.currentUnit);
                this.toggleUnits();
            });
        }
        
        // Toast close
        if (toastClose) {
            toastClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideToast();
            });
        }
        
        // Map controls
        if (zoomIn) {
            zoomIn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Map zoomed in');
            });
        }

        if (zoomOut) {
            zoomOut.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Map zoomed out');
            });
        }
        
        // Auto-hide toast after 5 seconds
        this.toastTimeout = null;
    }

    async loadCurrentLocation() {
        try {
            console.log('Loading weather for current location:', this.currentLocation);
            this.showLoading('currentWeatherLoading');
            
            // Try to fetch real data, fallback to sample data
            try {
                const weatherData = await this.fetchWeatherData(this.currentLocation.lat, this.currentLocation.lon);
                this.updateWeatherDisplay(weatherData);
                this.createHourlyChart(weatherData.hourly);
                this.updateWeeklyForecast(weatherData.daily);
                console.log('Successfully loaded real weather data');
            } catch (apiError) {
                console.warn('API failed, using sample data:', apiError);
                this.loadSampleData();
                this.showToast('Using sample weather data');
            }
        } catch (error) {
            console.error('Error loading weather data:', error);
            this.loadSampleData();
            this.showToast('Failed to load weather data. Using sample data.');
        } finally {
            this.hideLoading('currentWeatherLoading');
        }
    }

    async searchLocation() {
        const searchInput = document.getElementById('locationSearch');
        if (!searchInput) {
            console.error('Search input not found');
            return;
        }

        const searchTerm = searchInput.value.trim();
        console.log('Searching for:', searchTerm);
        
        if (!searchTerm) {
            this.showToast('Please enter a city name');
            return;
        }

        try {
            this.showLoading('currentWeatherLoading');
            
            try {
                const locations = await this.geocodeLocation(searchTerm);
                
                if (locations.length === 0) {
                    this.showToast('Location not found. Please try another search term.');
                    return;
                }

                const location = locations[0];
                this.currentLocation = {
                    lat: location.latitude,
                    lon: location.longitude,
                    name: `${location.name}${location.admin1 ? ', ' + location.admin1 : ''}${location.country ? ', ' + location.country : ''}`
                };

                const weatherData = await this.fetchWeatherData(this.currentLocation.lat, this.currentLocation.lon);
                this.updateWeatherDisplay(weatherData);
                this.createHourlyChart(weatherData.hourly);
                this.updateWeeklyForecast(weatherData.daily);
                
                searchInput.value = '';
                this.showToast(`Weather updated for ${this.currentLocation.name}`);
                console.log('Location search successful');
                
            } catch (apiError) {
                console.warn('Search API failed, simulating search:', apiError);
                // Simulate successful search with sample data
                this.currentLocation.name = searchTerm;
                this.loadSampleData();
                this.showToast(`Showing sample weather data for ${searchTerm}`);
                searchInput.value = '';
            }
            
        } catch (error) {
            console.error('Error searching location:', error);
            this.showToast('Failed to search location. Please try again.');
        } finally {
            this.hideLoading('currentWeatherLoading');
        }
    }

    getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showToast('Geolocation is not supported by this browser');
            return;
        }

        this.showLoading('currentWeatherLoading');
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    this.currentLocation.lat = position.coords.latitude;
                    this.currentLocation.lon = position.coords.longitude;
                    
                    // Try to get real data, fallback to sample data with location update
                    try {
                        const weatherData = await this.fetchWeatherData(this.currentLocation.lat, this.currentLocation.lon);
                        this.updateWeatherDisplay(weatherData);
                        this.createHourlyChart(weatherData.hourly);
                        this.updateWeeklyForecast(weatherData.daily);
                    } catch (apiError) {
                        console.warn('Weather API failed for current location:', apiError);
                        this.currentLocation.name = 'Your Current Location';
                        this.loadSampleData();
                    }
                    
                    this.showToast('Location updated to your current position');
                } catch (error) {
                    console.error('Error getting current location weather:', error);
                    this.showToast('Failed to get weather for current location');
                } finally {
                    this.hideLoading('currentWeatherLoading');
                }
            },
            (error) => {
                this.hideLoading('currentWeatherLoading');
                console.error('Geolocation error:', error);
                this.showToast('Unable to get your location. Please enable location services.');
            }
        );
    }

    async fetchWeatherData(lat, lon) {
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            hourly: 'temperature_2m,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility',
            timezone: 'auto',
            forecast_days: 7
        });

        const response = await fetch(`${this.apiEndpoints.forecast}?${params}`);
        if (!response.ok) {
            throw new Error(`Weather API request failed: ${response.status}`);
        }
        
        return await response.json();
    }

    async geocodeLocation(query) {
        const params = new URLSearchParams({
            name: query,
            count: 5,
            language: 'en',
            format: 'json'
        });

        const response = await fetch(`${this.apiEndpoints.geocoding}?${params}`);
        if (!response.ok) {
            throw new Error(`Geocoding API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        return data.results || [];
    }

    updateWeatherDisplay(data) {
        console.log('Updating weather display with data:', data);

        if (!data.current) {
            console.warn('No current weather data available');
            return;
        }

        const current = data.current;
        
        // Update current temperature
        const temp = this.convertTemperature(current.temperature_2m);
        const currentTempEl = document.getElementById('currentTemp');
        if (currentTempEl) {
            currentTempEl.textContent = Math.round(temp) + '°';
        }
        
        // Update feels like temperature
        const feelsLike = this.convertTemperature(current.apparent_temperature);
        const feelsLikeEl = document.getElementById('feelsLike');
        if (feelsLikeEl) {
            feelsLikeEl.textContent = `${Math.round(feelsLike)}°${this.currentUnit}`;
        }
        
        // Update weather condition
        const condition = this.getWeatherCondition(current.weather_code);
        const weatherConditionEl = document.getElementById('weatherCondition');
        const weatherIconEl = document.getElementById('weatherIcon');
        if (weatherConditionEl) weatherConditionEl.textContent = condition.description;
        if (weatherIconEl) weatherIconEl.textContent = condition.icon;
        
        // Update location
        const currentLocationEl = document.getElementById('currentLocation');
        if (currentLocationEl) {
            currentLocationEl.textContent = this.currentLocation.name;
        }
        
        // Update metrics
        const humidityEl = document.getElementById('humidity');
        const humidityBarEl = document.getElementById('humidityBar');
        if (humidityEl) humidityEl.textContent = Math.round(current.relative_humidity_2m || 0);
        if (humidityBarEl) humidityBarEl.style.width = `${current.relative_humidity_2m || 0}%`;
        
        const windSpeedEl = document.getElementById('windSpeed');
        const windDirectionEl = document.getElementById('windDirection');
        if (windSpeedEl) windSpeedEl.textContent = Math.round(current.wind_speed_10m || 0);
        if (windDirectionEl) windDirectionEl.style.transform = `rotate(${current.wind_direction_10m || 0}deg)`;
        
        const pressureEl = document.getElementById('pressure');
        const visibilityEl = document.getElementById('visibility');
        if (pressureEl) pressureEl.textContent = Math.round(current.surface_pressure || 1013);
        if (visibilityEl) visibilityEl.textContent = Math.round((current.visibility || 10000) / 1000);
        
        // Mock UV index (not provided by Open-Meteo in current weather)
        const uvIndex = 6;
        const uvIndexEl = document.getElementById('uvIndex');
        const uvIndicatorEl = document.getElementById('uvIndicator');
        if (uvIndexEl) uvIndexEl.textContent = uvIndex;
        if (uvIndicatorEl) uvIndicatorEl.textContent = this.getUVLevel(uvIndex);
        
        // Update weather background
        this.updateWeatherBackground(current.weather_code);
        
        console.log('Weather display updated successfully');
    }

    createHourlyChart(hourlyData) {
        const ctx = document.getElementById('hourlyChart');
        if (!ctx) {
            console.error('Chart canvas not found');
            return;
        }

        if (this.chart) {
            this.chart.destroy();
        }

        // Prepare data for next 24 hours
        const hours = hourlyData.time.slice(0, 24);
        const temperatures = hourlyData.temperature_2m.slice(0, 24).map(temp => this.convertTemperature(temp));
        const precipitation = hourlyData.precipitation_probability.slice(0, 24);

        const labels = hours.map(time => {
            const date = new Date(time);
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        });

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Temperature (°${this.currentUnit})`,
                        data: temperatures,
                        borderColor: '#32BDB8',
                        backgroundColor: 'rgba(50, 189, 184, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#32BDB8',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointHoverBackgroundColor: '#32BDB8',
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 3
                    },
                    {
                        label: 'Precipitation (%)',
                        data: precipitation,
                        type: 'bar',
                        backgroundColor: 'rgba(50, 189, 184, 0.3)',
                        borderColor: 'rgba(50, 189, 184, 0.6)',
                        borderWidth: 1,
                        yAxisID: 'y1',
                        hoverBackgroundColor: 'rgba(50, 189, 184, 0.5)',
                        hoverBorderColor: 'rgba(50, 189, 184, 0.8)',
                        hoverBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#f5f5f5',
                            font: {
                                family: 'FKGroteskNeue, Inter, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(38, 40, 40, 0.95)',
                        titleColor: '#32BDB8',
                        bodyColor: '#f5f5f5',
                        borderColor: 'rgba(50, 189, 184, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return `Time: ${context[0].label}`;
                            },
                            label: function(context) {
                                if (context.datasetIndex === 0) {
                                    return `Temperature: ${Math.round(context.parsed.y)}°${context.chart.data.datasets[0].label.slice(-2)}`;
                                } else {
                                    return `Precipitation: ${context.parsed.y}%`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(119, 124, 124, 0.2)'
                        },
                        ticks: {
                            color: '#a7a9a9'
                        }
                    },
                    y: {
                        position: 'left',
                        grid: {
                            color: 'rgba(119, 124, 124, 0.2)'
                        },
                        ticks: {
                            color: '#a7a9a9',
                            callback: function(value) {
                                return value + '°';
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        max: 100,
                        grid: {
                            drawOnChartArea: false,
                        },
                        ticks: {
                            color: '#a7a9a9',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });

        console.log('Chart created successfully');
    }

    updateWeeklyForecast(dailyData) {
        const container = document.getElementById('weeklyForecast');
        if (!container || !dailyData) {
            console.error('Weekly forecast container not found or no data');
            return;
        }

        container.innerHTML = '';

        for (let i = 0; i < Math.min(7, dailyData.time.length); i++) {
            const date = new Date(dailyData.time[i]);
            const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'long' });
            
            const condition = this.getWeatherCondition(dailyData.weather_code[i]);
            const highTemp = Math.round(this.convertTemperature(dailyData.temperature_2m_max[i]));
            const lowTemp = Math.round(this.convertTemperature(dailyData.temperature_2m_min[i]));
            const precipitation = dailyData.precipitation_probability_max[i] || 0;

            const dayElement = document.createElement('div');
            dayElement.className = 'forecast-day';
            dayElement.innerHTML = `
                <div class="day-info">
                    <div class="day-icon">${condition.icon}</div>
                    <div class="day-details">
                        <div class="day-name">${dayName}</div>
                        <div class="day-condition">${condition.description}</div>
                    </div>
                </div>
                <div class="temp-range">
                    <span class="temp-high">${highTemp}°</span>
                    <span class="temp-low">${lowTemp}°</span>
                </div>
                <div class="precipitation">${precipitation}%</div>
            `;

            // Add hover tooltip
            dayElement.title = `${dayName}: ${condition.description}, High: ${highTemp}°${this.currentUnit}, Low: ${lowTemp}°${this.currentUnit}, Rain: ${precipitation}%`;

            container.appendChild(dayElement);
        }

        console.log('Weekly forecast updated');
    }

    loadSampleData() {
        console.log('Loading sample data...');
        
        // Use sample data if API fails
        const sampleData = {
            current: {
                temperature_2m: 22,
                apparent_temperature: 25,
                weather_code: 2,
                relative_humidity_2m: 65,
                wind_speed_10m: 12,
                wind_direction_10m: 230,
                surface_pressure: 1013,
                visibility: 10000
            },
            hourly: {
                time: Array.from({length: 24}, (_, i) => {
                    const date = new Date();
                    date.setHours(date.getHours() + i);
                    return date.toISOString();
                }),
                temperature_2m: [18, 16, 19, 22, 26, 28, 25, 21, 19, 17, 16, 18, 22, 25, 27, 29, 26, 23, 21, 19, 18, 17, 16, 15],
                precipitation_probability: [0, 0, 10, 5, 0, 0, 15, 20, 25, 10, 5, 0, 0, 0, 5, 10, 15, 20, 25, 15, 10, 5, 0, 0]
            },
            daily: {
                time: Array.from({length: 7}, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    return date.toISOString().split('T')[0];
                }),
                weather_code: [2, 1, 61, 3, 2, 1, 95],
                temperature_2m_max: [28, 30, 25, 23, 27, 29, 26],
                temperature_2m_min: [18, 20, 15, 14, 17, 19, 16],
                precipitation_probability_max: [20, 0, 80, 40, 10, 5, 90]
            }
        };

        this.updateWeatherDisplay(sampleData);
        this.createHourlyChart(sampleData.hourly);
        this.updateWeeklyForecast(sampleData.daily);
    }

    convertTemperature(celsius) {
        return this.currentUnit === 'C' ? celsius : (celsius * 9/5) + 32;
    }

    toggleUnits() {
        console.log('Toggling units from:', this.currentUnit);
        
        this.currentUnit = this.currentUnit === 'C' ? 'F' : 'C';
        
        const unitToggleEl = document.getElementById('unitToggle');
        const tempUnitEl = document.getElementById('tempUnit');
        
        if (unitToggleEl) {
            unitToggleEl.textContent = `°${this.currentUnit}`;
        }
        if (tempUnitEl) {
            tempUnitEl.textContent = this.currentUnit;
        }
        
        console.log('Units toggled to:', this.currentUnit);
        
        // Refresh display with new units
        this.loadCurrentLocation();
        
        this.showToast(`Temperature units switched to °${this.currentUnit}`);
    }

    getWeatherCondition(code) {
        const conditions = {
            0: { description: 'Clear Sky', icon: '☀️' },
            1: { description: 'Mainly Clear', icon: '🌤️' },
            2: { description: 'Partly Cloudy', icon: '⛅' },
            3: { description: 'Overcast', icon: '☁️' },
            45: { description: 'Fog', icon: '🌫️' },
            48: { description: 'Depositing Rime Fog', icon: '🌫️' },
            51: { description: 'Light Drizzle', icon: '🌦️' },
            53: { description: 'Moderate Drizzle', icon: '🌦️' },
            55: { description: 'Dense Drizzle', icon: '🌦️' },
            61: { description: 'Slight Rain', icon: '🌧️' },
            63: { description: 'Moderate Rain', icon: '🌧️' },
            65: { description: 'Heavy Rain', icon: '🌧️' },
            95: { description: 'Thunderstorm', icon: '⛈️' },
            96: { description: 'Thunderstorm with Hail', icon: '⛈️' },
            99: { description: 'Heavy Thunderstorm with Hail', icon: '⛈️' }
        };
        
        return conditions[code] || { description: 'Unknown', icon: '❓' };
    }

    getUVLevel(uvIndex) {
        if (uvIndex <= 2) return 'Low';
        if (uvIndex <= 5) return 'Moderate';
        if (uvIndex <= 7) return 'High';
        if (uvIndex <= 10) return 'Very High';
        return 'Extreme';
    }

    updateWeatherBackground(weatherCode) {
        const background = document.getElementById('weatherBackground');
        if (!background) return;

        // Create different gradients based on weather condition
        const gradients = {
            0: 'radial-gradient(circle at 30% 20%, rgba(255, 193, 7, 0.3), transparent 50%)', // Clear
            1: 'radial-gradient(circle at 30% 20%, rgba(50, 184, 198, 0.3), transparent 50%)', // Mainly clear
            2: 'radial-gradient(circle at 30% 20%, rgba(119, 124, 124, 0.3), transparent 50%)', // Partly cloudy
            3: 'radial-gradient(circle at 30% 20%, rgba(98, 108, 113, 0.4), transparent 50%)', // Overcast
            61: 'radial-gradient(circle at 30% 20%, rgba(45, 166, 178, 0.4), transparent 50%)', // Rain
            95: 'radial-gradient(circle at 30% 20%, rgba(255, 84, 89, 0.3), transparent 50%)' // Thunderstorm
        };

        background.style.background = gradients[weatherCode] || gradients[2];
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        const currentTimeEl = document.getElementById('currentTime');
        if (currentTimeEl) {
            currentTimeEl.textContent = timeString;
        }
        
        // Update every minute
        setTimeout(() => this.updateTime(), 60000);
    }

    showLoading(elementId) {
        const loadingElement = document.getElementById(elementId);
        if (loadingElement) {
            loadingElement.classList.add('visible');
        }
    }

    hideLoading(elementId) {
        const loadingElement = document.getElementById(elementId);
        if (loadingElement) {
            loadingElement.classList.remove('visible');
        }
    }

    showToast(message) {
        console.log('Showing toast:', message);
        
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (!toast || !toastMessage) {
            console.error('Toast elements not found');
            return;
        }
        
        toastMessage.textContent = message;
        toast.classList.add('visible');
        
        // Clear existing timeout
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }
        
        // Auto-hide after 5 seconds
        this.toastTimeout = setTimeout(() => {
            this.hideToast();
        }, 5000);
    }

    hideToast() {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.remove('visible');
        }
        
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
            this.toastTimeout = null;
        }
    }

    startAutoRefresh() {
        // Refresh weather data every 10 minutes
        this.refreshInterval = setInterval(() => {
            console.log('Auto-refreshing weather data...');
            this.loadCurrentLocation();
        }, 600000);
    }

    destroy() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        if (this.chart) {
            this.chart.destroy();
        }
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }
    }
}

// Initialize the dashboard
console.log('Starting Weather Dashboard initialization...');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded, creating dashboard instance...');
    window.weatherDashboard = new WeatherDashboard();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.weatherDashboard) {
        window.weatherDashboard.destroy();
    }
});
