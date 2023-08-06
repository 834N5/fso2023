import React from "react";

function Header(props)
{
	return(
		<>
			<h1>{props.course}</h1>
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
			<Part part={props.parts[0].name} ex={props.parts[0].exercises} />
			<Part part={props.parts[1].name} ex={props.parts[1].exercises} />
			<Part part={props.parts[2].name} ex={props.parts[2].exercises} />
		</>
	);
}

function Total(props)
{
	let sum = 0;
	for (let i = 0; i < 3; ++i)
		sum += props.parts[i].exercises
	return(
		<>
			<p>Number of exercises {sum}</p>
		</>
	);
}

function App()
{
	const course = "Half Stack application development";
	const parts = [
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

	return(
		<>
			<Header course={course} />
			<Content parts={parts} />
			<Total parts={parts} />
		</>
	);
}

export default App;
