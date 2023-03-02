const Filter = ({ value, handleFilter }) => {
	return <input type='text' onChange={handleFilter} value={value} />;
};

export default Filter