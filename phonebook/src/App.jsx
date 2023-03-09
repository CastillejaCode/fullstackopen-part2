import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Form from './components/Form';
import Numbers from './components/Numbers';
import './App.css';
import backendService from './services/persons';
import Notification from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setNewFilter] = useState('');
	const [notification, setNotification] = useState();
	const [style, setStyle] = useState({});

	useEffect(() => {
		backendService.getAll().then((init) => setPersons(init));
	}, []);

	const addNotification = (person, condition = true) => {
		if (!condition) {
			setNotification(`Information of ${person} has already been removed from the server `);
			setStyle({
				color: 'red',
				fontStyle: 'italic',
				border: '2px solid red',
				fontSize: 'large',
			});
		} else {
			setNotification(`${person} has been added!`);
			setStyle({
				color: 'green',
				fontStyle: 'italic',
				border: '2px solid green',
				fontSize: 'large',
			});
		}

		setTimeout(() => {
			setNotification(null);
		}, 3000);
	};

	const addPerson = (e) => {
		e.preventDefault();
		const person = { name: newName.trim(), number: newNumber };
		let id;
		if (
			persons.some((element) => {
				id = element.id;
				return element.name === newName;
			})
		) {
			if (window.confirm(`${newName} is already in the phonebook, would you like to replace the number?`)) {
				backendService
					.update(id, person)
					.then(() => {
						setPersons(
							persons.map((p) => {
								if (p.id === id) return person;
								else return p;
							})
						);
						addNotification(person.name);
					})
					.catch(() => {
						addNotification(person.name, false);
					});
			}
		} else {
			backendService.create(person).then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
			addNotification(person.name);
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
			<Notification message={notification} style={style} />
			<h2>Filter</h2>
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
