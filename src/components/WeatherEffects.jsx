import { useEffect, useState } from 'react';

function WeatherEffects({ weather }) {
  const [effect, setEffect] = useState(null);

  useEffect(() => {
    if (!weather) return;

    const { main, weather: weatherDetails } = weather;
    const temp = main.temp;
    const weatherType = weatherDetails[0].main.toLowerCase();

    // Determine effect based on weather conditions
    if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
      setEffect('rain');
    } else if (weatherType.includes('snow')) {
      setEffect('snow');
    } else if (temp > 30 && weatherType.includes('clear')) { // Hot weather (above 30°C)
      setEffect('hot');
    } else if (temp < 5) { // Cold weather (below 5°C)
      setEffect('cold');
    } else {
      setEffect(null);
    }
  }, [weather]);

  if (!effect) return null;

  return (
    <div className="weather-effects-container">
      {effect === 'rain' && <RainEffect />}
      {effect === 'snow' && <SnowEffect />}
      {effect === 'hot' && <HotEffect />}
      {effect === 'cold' && <ColdEffect />}
      
      <style jsx="true">{`
        .weather-effects-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        
        /* Rain Effect */
        .rain {
          position: absolute;
          width: 2px;
          height: 20px;
          background: linear-gradient(transparent, rgba(255, 255, 255, 0.8));
          animation: rain-fall linear infinite;
        }
        
        @keyframes rain-fall {
          0% {
            transform: translateY(-100px);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        
        /* Snow Effect */
        .snowflake {
          position: absolute;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: snow-fall linear infinite;
        }
        
        @keyframes snow-fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        
        /* Hot Effect */
        .heat-wave {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,156,0,0.1) 0%, rgba(255,0,0,0) 70%);
          animation: heat-pulse 3s ease-in-out infinite;
        }
        
        @keyframes heat-pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        /* Cold Effect */
        .frost {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: frost-float linear infinite;
        }
        
        @keyframes frost-float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// Rain effect component
function RainEffect() {
  const raindrops = Array.from({ length: 100 }).map((_, i) => {
    const duration = Math.random() * 0.5 + 0.5;
    const delay = Math.random() * 2;
    const leftPos = Math.random() * 100;
    
    return (
      <div
        key={i}
        className="rain"
        style={{
          left: `${leftPos}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  
  return <>{raindrops}</>;
}

// Snow effect component
function SnowEffect() {
  const snowflakes = Array.from({ length: 50 }).map((_, i) => {
    const size = Math.random() * 5 + 3;
    const duration = Math.random() * 5 + 10;
    const delay = Math.random() * 5;
    const leftPos = Math.random() * 100;
    
    return (
      <div
        key={i}
        className="snowflake"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${leftPos}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  
  return <>{snowflakes}</>;
}

// Hot effect component
function HotEffect() {
  const heatWaves = Array.from({ length: 5 }).map((_, i) => {
    const size = Math.random() * 30 + 70;
    const duration = Math.random() * 2 + 2;
    const delay = Math.random() * 2;
    const leftPos = Math.random() * 100;
    const topPos = Math.random() * 100;
    
    return (
      <div
        key={i}
        className="heat-wave"
        style={{
          width: `${size}%`,
          height: `${size}%`,
          left: `${leftPos}%`,
          top: `${topPos}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  
  return <>{heatWaves}</>;
}

// Cold effect component
function ColdEffect() {
  const frostParticles = Array.from({ length: 30 }).map((_, i) => {
    const size = Math.random() * 20 + 10;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const leftPos = Math.random() * 100;
    const topPos = Math.random() * 100;
    
    return (
      <div
        key={i}
        className="frost"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${leftPos}%`,
          top: `${topPos}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  
  return <>{frostParticles}</>;
}

export default WeatherEffects;