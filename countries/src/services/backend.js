import axios from 'axios';
const baseURL = `https://restcountries.com/v3.1/all`;
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?`;
const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=`;
const api = import.meta.env.VITE_API;
console.log(typeof api);

const getQuery = () => {
	return axios.get(baseURL).then((response) => response.data);
};

const getWeather = async (capital) => {
	const place = await axios.get(`${geoURL}${capital}&limit=1&appid=${api}`).then((response) => response.data);
	const [lat, lon] = [place[0].lat, place[0].lon];

	const weather = await axios
		.get(`${weatherURL}lat=${lat}&lon=${lon}&units=imperial&appid=${api}`)
		.then((response) => response.data);
	return weather;
};

export default {
	getQuery,
	getWeather,
};
