import axios from 'axios';
const baseURL = `/api/persons`;

const getAll = () => {
	return axios.get(baseURL).then((response) => response.data);
};

const create = (person) => {
	return axios.post(baseURL, person).then((response) => response.data);
};

const update = (id, person) => {
	return axios.put(`${baseURL}/${id}`, person).then((response) => response.data);
};

const deletePerson = (id) => {
	return axios.delete(`${baseURL}/${id}`);
};

export default {
	getAll,
	create,
	deletePerson,
	update,
};
