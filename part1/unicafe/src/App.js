import {useState} from "react";

function Button({text, handleClick})
{
	return(
		<>
			<button onClick={handleClick}>{text}</button>
		</>
	);
}

function StatisticLine({text, value, unit})
{
	return(
		<tr>
			<td>{text}</td>
			<td>{value}{unit}</td>
		</tr>
	);
}
function Stats({dataGood, dataNeutral, dataBad})
{
	const numResponses = dataGood + dataNeutral + dataBad;
	if (numResponses === 0)
		return(
		<>
			<h1>Statistics</h1>
			<p>No feedback given</p>
		</>
		);
	return(
		<>
			<h1>Statistics</h1>
			<table style={{borderSpacing: "10px 0px"}}>
				<StatisticLine text="Good" value={dataGood} />
				<StatisticLine text="Neutral" value={dataNeutral} />
				<StatisticLine text="Bad" value={dataBad} />
				<StatisticLine text="Total responses" value={numResponses} />
				<StatisticLine text="Average" value={(dataGood + -1*dataBad)/numResponses} />
				<StatisticLine text="Positive" value={dataGood/numResponses*100} unit="%" />
			</table>
		</>
	);
}
function App()
{
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return(
		<>
			<h1>Unicafe</h1>

			<h1>Give feedback</h1>
			<Button text="good" handleClick={() => setGood(good+1)} />
			<Button text="neutral" handleClick={() => setNeutral(neutral+1)} />
			<Button text="bad" handleClick={() => setBad(bad+1)} />

			<Stats dataGood={good} dataNeutral={neutral} dataBad={bad} />
		</>
	);
}

export default App;
