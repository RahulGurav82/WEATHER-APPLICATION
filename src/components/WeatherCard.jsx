function WeatherCard({ weather, units }) {
  if (!weather) return null;

  const {
    name,
    sys: { country },
    weather: [{ icon, description }],
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
  } = weather;

  const formatTemp = (temp) => Math.round(temp);
  const formatWindSpeed = (speed) => {
    return units === "metric" 
      ? `${speed.toFixed(1)} m/s` 
      : `${speed.toFixed(1)} mph`;
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row items-center">
        <div className="p-6 md:p-8 flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {name}, {country}
            </h2>
          </div>
          
          <div className="mt-4 flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={description}
              className="w-24 h-24"
            />
            <div className="ml-4">
              <div className="text-5xl font-bold text-white">
                {formatTemp(temp)}°{units === "metric" ? "C" : "F"}
              </div>
              <div className="text-white/90 capitalize">{description}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 p-6 md:p-8 w-full md:w-auto">
          <div className="grid grid-cols-2 gap-4 text-white">
            <div>
              <div className="text-white/70">Feels Like</div>
              <div className="text-xl font-semibold">
                {formatTemp(feels_like)}°{units === "metric" ? "C" : "F"}
              </div>
            </div>
            <div>
              <div className="text-white/70">Humidity</div>
              <div className="text-xl font-semibold">{humidity}%</div>
            </div>
            <div>
              <div className="text-white/70">Wind</div>
              <div className="text-xl font-semibold">{formatWindSpeed(speed)}</div>
            </div>
            <div>
              <div className="text-white/70">Pressure</div>
              <div className="text-xl font-semibold">{pressure} hPa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;