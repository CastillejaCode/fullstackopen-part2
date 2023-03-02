const Form = ({ handlePersons, handleNumber, handleName, name, number }) => {
	return (
		<form onSubmit={handlePersons}>
			<div>
				name: <input value={name} onChange={handleName} />
			</div>
			<div>
				number: <input value={number} onChange={handleNumber} />
			</div>
			<button type='submit'>add</button>
		</form>
	);
};

export default Form;
