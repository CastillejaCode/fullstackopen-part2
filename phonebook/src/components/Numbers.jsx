const Person = ({ name, number }) => {
	return (
		<h4>
			{name} {number}
		</h4>
	);
};

const Numbers = ({ array }) => {
	return array.map((person) => <Person key={person.name} name={person.name} number={person.number} />);
};

export default Numbers;
