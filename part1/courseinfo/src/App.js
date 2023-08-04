import React from "react";

function Hello(props) {
	console.log(props);
	return (
		<>
			<p>hi {props.name}, you are {props.age} years old</p>
		</>
	)
}

function App() {
	console.log("Hello from component");
	const now = new Date();
	const a = 10;
	const b = 20;
	const name = "alice";
	const age = 9;
	return (
		<>
			<p>Hello, it is: {now.toString()}</p>
			<p>{a} + {b} = {a+b}</p>
			<Hello name="person" age="99" />
			<Hello name={name} age={age} />
		</>
	);
}

export default App;
