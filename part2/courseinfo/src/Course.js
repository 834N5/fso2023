function Header(props)
{
	return(
		<>
			<h1>{props.course.name}</h1>
		</>
	);
}

function Part(props)
{
	return(
		<>
			<p>{props.part} {props.ex}</p>
		</>
	);
}

function Content(props)
{
	return(
		<>
			<Part part={props.course.parts[0].name} ex={props.course.parts[0].exercises} />
			<Part part={props.course.parts[1].name} ex={props.course.parts[1].exercises} />
			<Part part={props.course.parts[2].name} ex={props.course.parts[2].exercises} />
		</>
	);
}

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
			<Total course={course} />
		</>
	);
}

export default Course;
