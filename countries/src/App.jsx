import { useState, useEffect } from 'react';
import backendService from './services/backend';
import Countries from './components/Countries';
import './App.css';

const App = () => {
	const [query, setQuery] = useState('');
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);

	useEffect(() => {
		backendService.getQuery().then((countries) => setCountries(countries));
	}, []);

	const handleChange = (e) => {
		const value = e.target.value;
		setQuery(value);
		const filter = countries.filter((country) => country.name.common.toLowerCase().startsWith(`${value}`));
		setFilteredCountries(filter);
	};

	return (
		<div>
			<div>
				find countries <input type='text' onChange={handleChange} value={query} />
			</div>
			<div>
				<Countries array={filteredCountries} />
			</div>
		</div>
	);
};

export default App;
