import React from 'react';

function Weather({ data }) {
  const groupByDay = () => {
    const groupedData = {};
    
    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0]; 
      if (!groupedData[date]) groupedData[date] = [];
      groupedData[date].push(item);
    });

    return groupedData;
  };

  const groupedData = groupByDay();

  return (
    <div className="forecast-container">
      {Object.entries(groupedData).map(([date, entries], index) => {
        const avgTemp = (
          entries.reduce((sum, entry) => sum + entry.main.temp, 0) / entries.length
        ).toFixed(1);

        const mainCondition = entries[0].weather[0].main; 
        const icon = entries[0].weather[0].icon;

        return (
          <div key={index} className="forecast-day">
            <h3>{new Date(date).toDateString()}</h3>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={mainCondition}
            />
            <p>{mainCondition}</p>
            <p>{avgTemp}°C</p>
          </div>
        );
      })}
    </div>
  );
}

export default Weather;
