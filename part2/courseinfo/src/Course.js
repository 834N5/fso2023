function Header({course})
{
	return(
		<>
			<h1>{course.name}</h1>
		</>
	);
}

function Part({name, exercises})
{
	return(
		<>
			<p>{name} {exercises}</p>
		</>
	);
}

function Content({course})
{
	return(
		<>
			{course.parts.map(parts =>
				<Part key={parts.id} name={parts.name} exercises={parts.exercises} />
			)}
		</>
	);
}

/* not functional */
function Total(props)
{
	let sum = 0;
	for (let i = 0; i < 3; ++i)
		sum += props.course.parts[i].exercises;
	return(
		<>
			<p>Number of exercises {sum}</p>
		</>
	);
}

function Course({course})
{
	return(
		<>
			<Header course={course} />
			<Content course={course} />
		</>
	);
}

export default Course;
