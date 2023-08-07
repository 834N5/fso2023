function Button() {
	return (
		<>
			<button>big red button</button>
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
			<Button />
			<Button />
			<Button />
			<h1>Statistics</h1>
			<Stats />
		</>
	)
}

export default App;
