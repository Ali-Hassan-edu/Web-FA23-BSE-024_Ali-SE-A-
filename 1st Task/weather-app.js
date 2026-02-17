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

const http = require('http');
const fs = require('fs');
const axios = require('axios');

// ============================================
// CONFIGURATION
// ============================================

const PORT = 3000;
const WEATHER_FILE = 'weather_log.txt';

// Open-Meteo API (Free, no API key required)
// Fetching weather for Vehari, Multan, Punjab, Pakistan
// Latitude: 30.0443, Longitude: 72.3517
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=30.0443&longitude=72.3517&current_weather=true';

// ============================================
// FUNCTION 1: FETCH WEATHER DATA
// ============================================

function fetchWeatherData() {
    console.log('📡 Step 1: Initiating weather data fetch...');
    console.log('   (Event Loop registers this async operation and moves on)');

    return axios.get(WEATHER_API_URL)
        .then(response => {
            console.log('✅ Step 2: Weather data received!');
            console.log('   (Event Loop processed the HTTP response callback)');

            const weather = response.data.current_weather;
            const timestamp = new Date().toISOString();

            const weatherData = {
                timestamp: timestamp,
                temperature: weather.temperature,
                windspeed: weather.windspeed,
                weathercode: weather.weathercode,
                location: 'Vehari, Multan, Punjab, Pakistan'
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

function saveWeatherToFile(weatherData) {
    console.log('💾 Step 3: Saving weather data to file...');
    console.log('   (Event Loop delegates file writing to the system)');

    const logEntry = `
=====================================
Date/Time: ${weatherData.timestamp}
Location: ${weatherData.location}
Temperature: ${weatherData.temperature}°C
Wind Speed: ${weatherData.windspeed} km/h
Weather Code: ${weatherData.weathercode}
=====================================
`;

    return new Promise((resolve, reject) => {
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

function createWeatherServer() {
    const server = http.createServer((req, res) => {
        console.log('🌐 Incoming HTTP request to:', req.url);
        console.log('   (Event Loop is handling this request asynchronously)');

        if (req.url === '/') {
            fs.readFile(WEATHER_FILE, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(`
            <html>
              <head><title>Weather App - Vehari</title></head>
              <body style="font-family: Arial; padding: 20px;">
                <h1>Weather Data Not Found</h1>
                <p>No weather data available yet. Please run the fetch operation first.</p>
                <p>Make sure to run <code>node weather-app.js</code> to fetch weather data.</p>
              </body>
            </html>
          `);
                } else {
                    console.log('✅ Weather file read successfully!');
                    console.log('   (Event Loop processed the file read callback)');

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`
            <html>
              <head>
                <title>Weather App - Vehari</title>
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
                  <strong>Location:</strong> Vehari, Multan, Punjab, Pakistan<br>
                  <strong>Coordinates:</strong> 30.0443°N, 72.3517°E<br>
                  <strong>Data Source:</strong> Open-Meteo API
                </div>
                <h2>Weather History:</h2>
                <pre>${data}</pre>
                <p><a href="/refresh">🔄 Fetch Latest Weather</a></p>
                <p><em>Refresh the page to see the latest data or click above to fetch new weather information.</em></p>
              </body>
            </html>
          `);
                }
            });

        } else if (req.url === '/refresh') {
            console.log('🔄 Refresh endpoint triggered');

            fetchWeatherData()
                .then(saveWeatherToFile)
                .then((weatherData) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`
            <html>
              <head>
                <title>Weather Refreshed - Vehari</title>
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
                  <strong>Location:</strong> Vehari, Multan, Punjab, Pakistan<br>
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
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    });

    server.listen(PORT, () => {
        console.log('\n🚀 ================================');
        console.log('   WEATHER APP SERVER STARTED');
        console.log('   ================================');
        console.log(`   Location: Vehari, Multan, Punjab, Pakistan`);
        console.log(`   Server running at http://localhost:${PORT}/`);
        console.log(`   View weather data: http://localhost:${PORT}/`);
        console.log(`   Refresh weather:   http://localhost:${PORT}/refresh`);
        console.log('   ================================\n');
    });

    return server;
}

// ============================================
// MAIN EXECUTION
// ============================================

console.log('🎬 STARTING WEATHER APP...');
console.log('================================================');
console.log('  Location: Vehari, Multan, Punjab, Pakistan');
console.log('  Demonstrates Node.js Event Loop & Non-blocking I/O');
console.log('================================================\n');

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

createWeatherServer();

console.log('⚡ Notice: Server is starting while weather data is being fetched!');
console.log('   This is the Event Loop in action - non-blocking operations!\n');