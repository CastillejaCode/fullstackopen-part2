const Person = ({ name, number, handleDelete }) => {
	return (
		<h4>
			{name} {number} <button onClick={handleDelete}>Delete</button>
		</h4>
	);
};

const Numbers = ({ array, handleDelete }) => {
	return array.map((person) => (
		<Person key={person.id} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)} />
	));
};

export default Numbers;
