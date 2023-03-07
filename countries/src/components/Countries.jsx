import { useState, useEffect } from 'react';
import backendService from '../services/backend';

const Country = ({ country }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		backendService.getWeather(country.capital).then((data) => {
			setWeather(data);
			console.log(data);
		});
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
						<li key={key[0]}>{key[1]}</li>
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

const Countries = ({ array }) => {
	if (array.length > 10) return <h2>Too many matches, specify another filter</h2>;
	else if (array.length === 1) return <Country country={array[0]} />;
	else {
		return (
			<ul>
				{array.map((country) => {
					return (
						<li key={country.name.common}>
							{country.name.common}
							<button>Show More</button>
						</li>
					);
				})}
			</ul>
		);
	}
};

export default Countries;
