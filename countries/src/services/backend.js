import axios from 'axios';
const baseURL = `https://restcountries.com/v3.1/all`;

const getQuery = (country) => {
	return axios.get(baseURL).then((response) => response.data);
};

export default {
	getQuery,
};
