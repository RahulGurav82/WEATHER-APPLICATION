function Forecast({ forecast, units }) {
  if (!forecast) return null;

  // Group forecast data by day
  const groupByDay = (data) => {
    const groupedData = {};
    
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      
      groupedData[date].push(item);
    });
    
    return Object.values(groupedData);
  };

  const dailyForecasts = groupByDay(forecast);
  
  // Take first 5 days
  const fiveDayForecast = dailyForecasts.slice(0, 5).map((day) => {
    // Use the middle of the day forecast (noon) or the first one if not available
    const middayIndex = day.findIndex(
      (item) => new Date(item.dt * 1000).getHours() === 12
    );
    
    const representativeForecast = middayIndex !== -1 ? day[middayIndex] : day[0];
    
    return representativeForecast;
  });

  const formatTemp = (temp) => Math.round(temp);
  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">5-Day Forecast</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {fiveDayForecast.map((item) => (
          <div 
            key={item.dt} 
            className="bg-white/10 rounded-lg p-4 text-center flex flex-col items-center"
          >
            <div className="text-white font-medium">{formatDay(item.dt)}</div>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="w-12 h-12 my-1"
            />
            <div className="text-lg font-bold text-white">
              {formatTemp(item.main.temp)}°{units === "metric" ? "C" : "F"}
            </div>
            <div className="text-white/70 text-sm capitalize">
              {item.weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;