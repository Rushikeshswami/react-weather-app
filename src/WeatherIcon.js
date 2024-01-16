import React from 'react';

const WeatherIcon = ({ icon }) => {
  const iconUrl = `https:${icon}`;

  return (
    <div className="weather-icon">
      <img src={iconUrl} alt="Weather Icon" />
    </div>
  );
};

export default WeatherIcon;
