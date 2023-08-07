function Button({text}) {
	return (
		<>
			<button>{text}</button>
		</>
	)
}

function Stats() {
	return (
		<>
			<p>something something stats</p>
		</>
	)
}
function App() {
	return (
		<>
			<h1>Unicafe</h1>
			<h1>Give feedback</h1>
			<Button text="good"/>
			<Button text="neutral"/>
			<Button text="bad"/>
			<h1>Statistics</h1>
			<Stats />
		</>
	)
}

export default App;
