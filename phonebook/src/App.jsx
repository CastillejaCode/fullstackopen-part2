import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Form from './components/Form';
import Numbers from './components/Numbers';
import './App.css';
import backendService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setNewFilter] = useState('');

	useEffect(() => {
		backendService.getAll().then((init) => setPersons(init));
	}, []);

	const addPerson = (e) => {
		e.preventDefault();
		const person = { name: newName.trim(), number: newNumber, id: newName.trim() };
		if (persons.some((element) => element.name === newName)) {
			if (window.confirm(`${newName} is already in the phonebook, would you like to replace the number?`)) {
				backendService.update(person.id, person).then((newPerson) =>
					setPersons(
						persons.map((p) => {
							if (p.id === person.id) return person;
							else return p;
						})
					)
				);
			}
		} else {
			backendService.create(person).then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
		}
		setNewName('');
		setNewNumber('');
	};

	const handleFilter = (e) => {
		setNewFilter(e.target.value);
	};

	const deletePerson = (id) => {
		if (window.confirm(`Are you sure you want to delete that?`)) {
			backendService.deletePerson(id);
			setPersons(persons.filter((n) => n.id !== id));
		}
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
				handlePersons={addPerson}
				name={newName}
				number={newNumber}
				handleName={handleName}
				handleNumber={handleNumber}
			/>
			<h2>Numbers</h2>
			<Numbers array={arrayFilter} handleDelete={deletePerson} />
		</div>
	);
};

export default App;
