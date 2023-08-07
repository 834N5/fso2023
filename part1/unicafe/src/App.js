import {useState} from "react";

function Button({text, handleClick}) {
	return (
		<>
			<button onClick={handleClick}>{text}</button>
		</>
	)
}

function Stats({dataGood, dataNeutral, dataBad}) {
	return (
		<>
			<p>something something stats</p>
			<p>Good: {dataGood}</p>
			<p>Neutral: {dataNeutral}</p>
			<p>Bad: {dataBad}</p>
		</>
	)
}
function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<h1>Unicafe</h1>

			<h1>Give feedback</h1>
			<Button text="good" handleClick={() => setGood(good+1)} />
			<Button text="neutral" handleClick={() => setNeutral(neutral+1)} />
			<Button text="bad" handleClick={() => setBad(bad+1)} />

			<h1>Statistics</h1>
			<Stats dataGood={good} dataNeutral={neutral} dataBad={bad} />
		</>
	)
}

export default App;
