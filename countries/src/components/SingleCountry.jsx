import backendService from '../services/backend';
import { useState, useEffect } from 'react';

const SingleCountry = ({ country }) => {
	const [weather, setWeather] = useState(null);
	useEffect(() => {
		backendService.getWeather(country.capital).then((data) => setWeather(data));
	}, []);
	if (!weather) null;
	else {
		return (
			<div>
				<h1>{country.name.common}</h1>
				<h2>Capital: {country.capital}</h2>
				<h2>Area: {country.area} km2</h2>
				<h2>Languages</h2>
				<ul>
					{Object.entries(country.languages).map((key) => (
						<li key='{key[0]}'>{key[1]}</li>
					))}
				</ul>
				<h1>{country.flag}</h1>
				<h1>Weather in {country.capital}</h1>
				<h2>Temp: {weather.main.temp} C</h2>
				<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather conditions' />
				<h2>Wind: {weather.wind.speed} m/s</h2>
			</div>
		);
	}
};

export default SingleCountry;
