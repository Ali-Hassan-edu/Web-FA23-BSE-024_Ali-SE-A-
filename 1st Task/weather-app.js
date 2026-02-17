/**
 * WEATHER APP - NODE.JS BEGINNER PROJECT
 * 
 * This project demonstrates:
 * 1. Node.js Event Loop & Non-blocking I/O
 * 2. Core Modules (fs, http)
 * 3. NPM packages (axios)
 * 4. Asynchronous programming with Promises
 */

// ============================================
// IMPORTING MODULES
// ============================================

// Core Module: 'http' - Built into Node.js for creating web servers
const http = require('http');

// Core Module: 'fs' (File System) - Built into Node.js for file operations
const fs = require('fs');

// Third-party Module: 'axios' - Installed via NPM for making HTTP requests
// Note: This needs to be installed first using: npm install axios
const axios = require('axios');

// ============================================
// CONFIGURATION
// ============================================

const PORT = 3000;
const WEATHER_FILE = 'weather_log.txt';

// Open-Meteo API (Free, no API key required)
// Fetching weather for New York City (latitude: 40.7128, longitude: -74.0060)
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true';

// ============================================
// FUNCTION 1: FETCH WEATHER DATA
// ============================================

/**
 * Fetches weather data from Open-Meteo API
 * 
 * EVENT LOOP EXPLANATION:
 * - axios.get() is an ASYNCHRONOUS operation
 * - When called, Node.js registers this HTTP request with the system
 * - The Event Loop doesn't wait! It continues executing other code
 * - When the API responds, the Event Loop picks up the callback and executes it
 * - This is NON-BLOCKING I/O: other operations can run while waiting for the response
 */
function fetchWeatherData() {
    console.log('📡 Step 1: Initiating weather data fetch...');
    console.log('   (Event Loop registers this async operation and moves on)');

    // Return a Promise so we can chain operations
    return axios.get(WEATHER_API_URL)
        .then(response => {
            console.log('✅ Step 2: Weather data received!');
            console.log('   (Event Loop processed the HTTP response callback)');

            // Extract weather information
            const weather = response.data.current_weather;
            const timestamp = new Date().toISOString();

            // Format the data nicely
            const weatherData = {
                timestamp: timestamp,
                temperature: weather.temperature,
                windspeed: weather.windspeed,
                weathercode: weather.weathercode,
                location: 'New York City'
            };

            console.log('   Temperature:', weather.temperature, '°C');
            console.log('   Wind Speed:', weather.windspeed, 'km/h');

            return weatherData;
        })
        .catch(error => {
            console.error('❌ Error fetching weather data:', error.message);
            throw error;
        });
}

// ============================================
// FUNCTION 2: SAVE DATA TO FILE
// ============================================

/**
 * Saves weather data to a file using the fs module
 * 
 * EVENT LOOP EXPLANATION:
 * - fs.appendFile() is ASYNCHRONOUS (non-blocking)
 * - Node.js hands off the file write operation to the system
 * - The Event Loop continues without waiting for the file write to complete
 * - When file writing finishes, the callback is added to the Event Loop queue
 * - This prevents the entire application from freezing during file I/O
 */
function saveWeatherToFile(weatherData) {
    console.log('💾 Step 3: Saving weather data to file...');
    console.log('   (Event Loop delegates file writing to the system)');

    // Format data as a readable log entry
    const logEntry = `
=====================================
Date/Time: ${weatherData.timestamp}
Location: ${weatherData.location}
Temperature: ${weatherData.temperature}°C
Wind Speed: ${weatherData.windspeed} km/h
Weather Code: ${weatherData.weathercode}
=====================================
`;

    // Return a Promise for better async handling
    return new Promise((resolve, reject) => {
        // fs.appendFile is asynchronous - it doesn't block!
        fs.appendFile(WEATHER_FILE, logEntry, (err) => {
            if (err) {
                console.error('❌ Error writing to file:', err.message);
                reject(err);
            } else {
                console.log('✅ Step 4: Weather data saved successfully!');
                console.log('   (Event Loop executed the file write callback)');
                resolve(weatherData);
            }
        });
    });
}

// ============================================
// FUNCTION 3: CREATE HTTP SERVER
// ============================================

/**
 * Creates an HTTP server that reads the weather file and displays it
 * 
 * EVENT LOOP EXPLANATION:
 * - http.createServer() creates a server that listens for requests
 * - Each incoming request is handled ASYNCHRONOUSLY
 * - When a request arrives, it's added to the Event Loop's queue
 * - fs.readFile() is also async - doesn't block while reading the file
 * - Multiple requests can be handled concurrently without blocking!
 */
function createWeatherServer() {
    const server = http.createServer((req, res) => {
        console.log('🌐 Incoming HTTP request to:', req.url);
        console.log('   (Event Loop is handling this request asynchronously)');

        if (req.url === '/') {
            // Read the weather file asynchronously
            fs.readFile(WEATHER_FILE, 'utf8', (err, data) => {
                if (err) {
                    // If file doesn't exist or error occurs
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(`
            <html>
              <head><title>Weather App</title></head>
              <body style="font-family: Arial; padding: 20px;">
                <h1>Weather Data Not Found</h1>
                <p>No weather data available yet. Please run the fetch operation first.</p>
                <p>Make sure to run <code>node weather-app.js</code> to fetch weather data.</p>
              </body>
            </html>
          `);
                } else {
                    // Successfully read the file
                    console.log('✅ Weather file read successfully!');
                    console.log('   (Event Loop processed the file read callback)');

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`
            <html>
              <head>
                <title>Weather App</title>
                <style>
                  body { font-family: Arial; padding: 20px; background-color: #f0f8ff; }
                  h1 { color: #2c3e50; }
                  pre { background-color: white; padding: 15px; border-radius: 5px; 
                        border-left: 4px solid #3498db; overflow-x: auto; }
                  .info { background-color: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0; }
                </style>
              </head>
              <body>
                <h1>🌤️ Weather Data Log</h1>
                <div class="info">
                  <strong>Location:</strong> New York City<br>
                  <strong>Data Source:</strong> Open-Meteo API
                </div>
                <h2>Weather History:</h2>
                <pre>${data}</pre>
                <p><em>Refresh the page to see the latest data or run the script again to fetch new weather information.</em></p>
              </body>
            </html>
          `);
                }
            });
        } else if (req.url === '/refresh') {
            // Endpoint to fetch fresh weather data
            console.log('🔄 Refresh endpoint triggered');

            fetchWeatherData()
                .then(saveWeatherToFile)
                .then((weatherData) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`
            <html>
              <head>
                <title>Weather Refreshed</title>
                <style>
                  body { font-family: Arial; padding: 20px; background-color: #f0f8ff; }
                  .success { background-color: #d4edda; padding: 15px; border-radius: 5px; 
                             border-left: 4px solid #28a745; }
                  a { color: #007bff; text-decoration: none; }
                  a:hover { text-decoration: underline; }
                </style>
              </head>
              <body>
                <h1>✅ Weather Data Refreshed!</h1>
                <div class="success">
                  <strong>Latest Update:</strong> ${weatherData.timestamp}<br>
                  <strong>Temperature:</strong> ${weatherData.temperature}°C<br>
                  <strong>Wind Speed:</strong> ${weatherData.windspeed} km/h
                </div>
                <p><a href="/">← Back to Weather Log</a></p>
              </body>
            </html>
          `);
                })
                .catch(error => {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(`
            <html>
              <head><title>Error</title></head>
              <body style="font-family: Arial; padding: 20px;">
                <h1>❌ Error</h1>
                <p>Failed to fetch weather data: ${error.message}</p>
                <p><a href="/">← Back to Weather Log</a></p>
              </body>
            </html>
          `);
                });
        } else {
            // 404 for unknown routes
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    });

    server.listen(PORT, () => {
        console.log('\n🚀 ================================');
        console.log('   WEATHER APP SERVER STARTED');
        console.log('   ================================');
        console.log(`   Server running at http://localhost:${PORT}/`);
        console.log(`   View weather data: http://localhost:${PORT}/`);
        console.log(`   Refresh weather: http://localhost:${PORT}/refresh`);
        console.log('   ================================\n');
    });

    return server;
}

// ============================================
// MAIN EXECUTION
// ============================================

console.log('🎬 STARTING WEATHER APP...');
console.log('================================================');
console.log('This demonstrates Node.js Event Loop & Non-blocking I/O');
console.log('================================================\n');

// Start fetching weather data (non-blocking)
fetchWeatherData()
    .then(saveWeatherToFile)
    .then(() => {
        console.log('\n🎉 Initial weather data fetch complete!');
        console.log('   You can now view the data in your browser.\n');
    })
    .catch(error => {
        console.error('\n❌ Error in initial fetch:', error.message);
        console.log('   The server will still run, but no initial data is available.\n');
    });

// Start the HTTP server (non-blocking - doesn't wait for weather fetch!)
createWeatherServer();

console.log('⚡ Notice: Server is starting while weather data is being fetched!');
console.log('   This is the Event Loop in action - non-blocking operations!\n');