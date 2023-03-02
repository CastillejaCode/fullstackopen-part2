const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => {
	const sum = parts.reduce((accumulator, current) => accumulator + current.exercises, 0);
	return <p>Total number of exercises {sum}</p>;
};

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => {
				return <Part key={part.id} part={part} />;
			})}
		</>
	);
};

const Course = ({ course }) => {
	return (
		<>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
};

export default Course;
