import { useState } from 'react';
import SingleCountry from './SingleCountry';

const Country = ({ country }) => {
	const [showMore, setShowMore] = useState(false);

	const handleMoreClick = () => setShowMore(!showMore);

	return (
		<li>
			<h2>
				{country.name.common} <button onClick={handleMoreClick}>{showMore ? 'Show Less' : 'Show More'}</button>
			</h2>
			{showMore && <SingleCountry country={country} />}
		</li>
	);
};

const Countries = ({ array }) => {
	if (array.length > 10) return <h2>Too many matches, specify another filter</h2>;
	else if (array.length === 1) return <SingleCountry country={array[0]} />;
	else {
		return (
			<ul>
				{array.map((country) => (
					<Country country={country} />
				))}
			</ul>
		);
	}
};

export default Countries;
