const Country = ({ array }) => {
	const country = array[0];
	return (
		<div>
			<h1>{country.name.common}</h1>
			<h2>Capital: {country.capital}</h2>
			<h2>Area: {country.area} km2</h2>
			<ul>
				{Object.entries(country.languages).map((key) => (
					<li key={key[0]}>{key[1]}</li>
				))}
			</ul>
			<h1>{country.flag}</h1>
		</div>
	);
};

const Countries = ({ array }) => {
	if (array.length > 10) return <h2>Too many matches, specify another filter</h2>;
	else if (array.length === 1) return <Country array={array} />;
	else {
		return (
			<ul>
				{array.map((country) => (
					<div>
						<li key={country.name.common}>
							{country.name.common} <button> Show More</button>
						</li>
					</div>
				))}
			</ul>
		);
	}
};

export default Countries;
