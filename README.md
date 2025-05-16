# Weather App with React 19, Vite, and TailwindCSS

*COMPANY*: CODTECH IT SOLUTIONS  
*NAME*: RAHUL GURAV  
*INTERN ID*: CT04DA627  
*DOMAIN*: Mern Stack Web Development  
*DURATION*: 4 WEEEKS  
*MENTOR*: NEELA SANTOSH  

## OUTPUT

![Weather App Screenshot](https://github.com/user-attachments/assets/fa375d38-0c85-4a40-bc31-e2e6b7cf633c)

## Project Overview

This is a modern, responsive weather application built using React 19, Vite, TailwindCSS, and the OpenWeatherMap API. The app provides current weather conditions and a 5-day forecast for any city in the world.

### Features

- **Current Weather Display**: Temperature, feels like, humidity, wind speed, and pressure
- **5-Day Weather Forecast**: Daily weather predictions
- **Geolocation Support**: Automatically detects user location on initial load
- **City Search**: Look up weather information for any city worldwide
- **Unit Toggle**: Switch between metric (°C) and imperial (°F) units
- **Responsive Design**: Works seamlessly across mobile and desktop devices
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during data fetching

## Tech Stack

- **React 19**: For building the user interface
- **Vite**: Fast development environment and build tool
- **TailwindCSS**: Utility-first CSS framework for styling
- **OpenWeatherMap API**: Weather data source

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/RahulGurav82/WEATHER-APPLICATION
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
   (Get your API key by signing up at [OpenWeatherMap](https://openweathermap.org/))

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `https://weather-application-fawn-xi.vercel.app/`

## Project Structure

```
weather-app/
├── public/
│   └── screenshots/
│       └── weather-app-screenshot.png
├── src/
│   ├── components/
│   │   ├── Forecast.jsx        # 5-day forecast component
│   │   ├── LoadingSpinner.jsx  # Loading indicator component
│   │   ├── SearchBox.jsx       # City search component
│   │   └── WeatherCard.jsx     # Current weather display component
│   ├── App.jsx                 # Main application component
│   ├── index.css               # Global styles and Tailwind imports
│   └── main.jsx                # Application entry point
├── .env                        # Environment variables (not in repo)
├── index.html                  # HTML entry point  
├── package.json                # Project dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # TailwindCSS configuration
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

## Usage

1. **Current Location Weather**: The app automatically tries to get your current location when loaded
2. **Search for a City**: Type a city name in the search box and click "Search"
3. **View Weather Details**: Current temperature, conditions, and other details are displayed
4. **Check Forecast**: Scroll down to see the 5-day forecast
5. **Change Units**: Click the unit toggle button (°C/°F) to switch between metric and imperial units

## Future Enhancements

- Add weather alerts and notifications
- Implement dark/light mode toggle
- Add hourly forecast
- Save favorite locations
- Add historical weather data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API
- [React](https://reactjs.org/) for the UI library
- [Vite](https://vitejs.dev/) for the build tool
- [TailwindCSS](https://tailwindcss.com/) for the styling framework

---

Developed as part of an internship project at CODTECH IT SOLUTIONS.
