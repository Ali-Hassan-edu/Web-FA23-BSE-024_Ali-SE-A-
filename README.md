# 🌤️ Weather App — Node.js Beginner Project

![Node.js](https://img.shields.io/badge/Node.js-v25%2B-brightgreen?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![API](https://img.shields.io/badge/API-Open--Meteo-orange)
![Status](https://img.shields.io/badge/Status-Active-success)

> A beginner-friendly Node.js weather application that fetches real-time weather data for **Vehari, Multan, Punjab, Pakistan** using the free Open-Meteo API — with no API key required.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Concepts Demonstrated](#key-concepts-demonstrated)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Location Details](#location-details)
- [Technologies Used](#technologies-used)
- [Learning Resources](#learning-resources)
- [Author](#author)

---

## 📖 About the Project

This project is a simple yet educational weather application built with **Node.js**. It demonstrates core backend concepts including asynchronous programming, the Node.js Event Loop, non-blocking I/O, HTTP server creation, file system operations, and third-party package usage via NPM.

Weather data is fetched from the **Open-Meteo API** (free, no API key required) for **Vehari, Multan, Punjab, Pakistan**, logged to a local file, and served via a lightweight HTTP server.

---

## 💡 Key Concepts Demonstrated

| Concept | Description |
|---|---|
| **Event Loop** | How Node.js handles async operations without blocking |
| **Non-blocking I/O** | File reads/writes that don't freeze the server |
| **Core Modules** | `http` for servers, `fs` for file operations |
| **NPM Packages** | Installing and using `axios` for HTTP requests |
| **Promises** | Chaining `.then()` and `.catch()` for async flow |
| **HTTP Server** | Creating and handling routes manually |

---

## 📁 Project Structure

```
1st Task/
├── weather-app.js       # Main application file
├── weather_log.txt      # Auto-generated weather data log
├── package.json         # Project metadata and dependencies
├── node_modules/        # Installed NPM packages
└── README.md            # Project documentation
```

---

## ✅ Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) `v14` or higher (tested on v25.6.1)
- [NPM](https://www.npmjs.com/) (comes with Node.js)
- Internet connection (for fetching weather data from the API)

---

## ⚙️ Installation

**1. Clone the repository**

```bash
git clone https://github.com/Web-FA23-BSE-024_Ali-SE-A-.git
cd "Web-FA23-BSE-024_Ali-SE-A-/1st Task"
```

**2. Initialize the project** *(skip if `package.json` already exists)*

```bash
npm init -y
```

**3. Install dependencies**

```bash
npm install axios
```

That's it — no other setup required!

---

## 🚀 Usage

**Run the application:**

```bash
node weather-app.js
```

**Expected terminal output:**

```
🎬 STARTING WEATHER APP...
================================================
  Location: Vehari, Multan, Punjab, Pakistan
  Demonstrates Node.js Event Loop & Non-blocking I/O
================================================

📡 Step 1: Initiating weather data fetch...
⚡ Notice: Server is starting while weather data is being fetched!

🚀 ================================
   WEATHER APP SERVER STARTED
   ================================
   Location: Vehari, Multan, Punjab, Pakistan
   Server running at http://localhost:3000/
   View weather data: http://localhost:3000/
   Refresh weather:   http://localhost:3000/refresh
   ================================

✅ Step 2: Weather data received!
💾 Step 3: Saving weather data to file...
✅ Step 4: Weather data saved successfully!

🎉 Initial weather data fetch complete!
```

Then open your browser and navigate to `http://localhost:3000/`

---

## 🔗 API Endpoints

| Route | Method | Description |
|---|---|---|
| `/` | GET | Displays the full weather history log |
| `/refresh` | GET | Fetches fresh weather data and saves it |
| `/*` | GET | Returns 404 Not Found |

---

## ⚙️ How It Works

```
┌─────────────────────────────────────────────────────┐
│                   Node.js Event Loop                │
│                                                     │
│  1. App starts → fetchWeatherData() is called       │
│  2. Event Loop registers HTTP request (async)       │
│  3. Does NOT wait → createWeatherServer() runs      │
│  4. Server starts listening on port 3000            │
│  5. API responds → callback fires                   │
│  6. weatherData is saved to weather_log.txt         │
│  7. Browser request → fs.readFile() (async)         │
│  8. File content is returned and rendered           │
└─────────────────────────────────────────────────────┘
```

**The key insight:** The HTTP server starts *immediately* without waiting for the weather data to be fetched — this is non-blocking I/O in action.

---

## 📍 Location Details

| Field | Value |
|---|---|
| **City** | Vehari |
| **Division** | Multan |
| **Province** | Punjab |
| **Country** | Pakistan |
| **Latitude** | 30.0443°N |
| **Longitude** | 72.3517°E |
| **API Source** | [Open-Meteo](https://open-meteo.com/) |

To change the location, update `WEATHER_API_URL` in `weather-app.js`:

```js
const WEATHER_API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=YOUR_LAT&longitude=YOUR_LON&current_weather=true';
```

---

## 🛠️ Technologies Used

- **[Node.js](https://nodejs.org/)** — JavaScript runtime environment
- **[axios](https://axios-http.com/)** — Promise-based HTTP client (NPM package)
- **`http`** — Built-in Node.js module for creating web servers
- **`fs`** — Built-in Node.js module for file system operations
- **[Open-Meteo API](https://open-meteo.com/)** — Free weather API, no key required

---

## 📚 Learning Resources

- [Node.js Official Docs](https://nodejs.org/en/docs/)
- [Understanding the Event Loop](https://nodejs.org/en/guides/event-loop-timers-and-nexttick)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Open-Meteo API Docs](https://open-meteo.com/en/docs)
- [NPM Docs](https://docs.npmjs.com/)

---

## 👨‍💻 Author

**Ali** — BSE-024, Section A  
📅 Semester: Fall 2023  
🏫 Web Development Assignment — 1st Task  

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
