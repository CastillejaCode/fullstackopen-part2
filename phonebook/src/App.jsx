import { useState } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Numbers from './components/Numbers';
import './App.css';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setNewFilter] = useState('');

	const handlePersons = (e) => {
		e.preventDefault();
		if (persons.some((element) => element.name === newName)) alert(`${newName} is already in the list!`);
		else setPersons(persons.concat({ name: newName, number: newNumber }));
		setNewName('');
		setNewNumber('');
	};

	const handleFilter = (e) => {
		setNewFilter(e.target.value);
	};

	const handleName = (e) => setNewName(e.target.value);
	const handleNumber = (e) => setNewNumber(e.target.value);

	const arrayFilter = persons.filter((person) => person.name.toLowerCase().startsWith(`${filter}`));

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter value={filter} handleFilter={handleFilter} />
			<h2>Add New</h2>
			<Form
				handlePersons={handlePersons}
				name={newName}
				number={newNumber}
				handleName={handleName}
				handleNumber={handleNumber}
			/>
			<h2>Numbers</h2>
			<Numbers array={arrayFilter} />
		</div>
	);
};

export default App;
