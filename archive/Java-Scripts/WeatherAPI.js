const weatherContainer = document.querySelector(".weather-container");
const welcomeMessage = document.getElementById("welcome-message");
const dateTimeElement = document.getElementById("date-time");
const weatherInfo = document.getElementById("weather-info");
const lastVisitElement = document.getElementById("last-visit");

// Update interval (in milliseconds)
const updateInterval = 1000; // 1 Secvond

// Get user's name and set personalized message
const userName = prompt("Please enter your name:") || "Guest";
welcomeMessage.textContent = `Welcome, ${userName}!`;

// Function to get the current time of day


// Display current date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZoneName: 'short' 
    };
    const formattedTime = now.toLocaleTimeString('en-US', options);
    const formattedDate = now.toLocaleDateString('en-US');
    dateTimeElement.textContent = `${getTimeOfDay()} ${userName}! It's ${formattedTime} on ${formattedDate}.`;
}

function getTimeOfDay() {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) {
        return "Good morning";
    } else if (hours < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

// Fetch weather data from your API
async function fetchWeather() {
    const weatherCodes = {
        0: "Clear",
        1: "Partly Cloudy",
        2: "Cloudy",
        3: "Overcast",
        // Add more weather codes as necessary
    };

    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=42.3314&longitude=-83.0457&hourly=temperature_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York"
        );
        const data = await response.json();

        // Extract the current weather and forecast data
        const currentWeather = data.hourly;
        const temperature = currentWeather.temperature_2m[0]; // Latest temperature
        const weatherCode = currentWeather.weather_code[0]; // Latest weather condition code

        // Update weather display
        weatherInfo.innerHTML = `
            <p>Temperature: ${temperature}°F</p>
            <p>Forecast: ${weatherCodes[weatherCode]}</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = "<p>Unable to fetch weather data.</p>";
    }
    
}

// Store and retrieve last visit information
function handleLastVisit() {
    const lastVisit = localStorage.getItem("lastVisit");
    if (lastVisit) {
        lastVisitElement.textContent = `Last visit: ${new Date(
            lastVisit
        ).toLocaleString()}`;
    } else {
        lastVisitElement.textContent = "Welcome to your first visit!";
    }
    localStorage.setItem("lastVisit", new Date().toISOString());
}

// Initialize and update at intervals
function init() {
    updateDateTime();
    fetchWeather();
    handleLastVisit();
    setInterval(() => {
        updateDateTime();
        fetchWeather();
    }, updateInterval);
}


init();

