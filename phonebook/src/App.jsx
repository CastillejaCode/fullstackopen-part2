import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Form from './components/Form';
import Numbers from './components/Numbers';
import './App.css';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setNewFilter] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data);
		});
	}, []);

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
