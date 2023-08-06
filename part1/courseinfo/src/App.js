import React from "react";

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
	)
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
		sum += props.course.parts[i].exercises
	return(
		<>
			<p>Number of exercises {sum}</p>
		</>
	);
}

function App()
{
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10
			},
			{
				name: "Using props to pass data",
				exercises: 7
			},
			{
				name: "State of a component",
				exercises: 14
			}
		]
	}

	return(
		<>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</>
	);
}

export default App;
//
