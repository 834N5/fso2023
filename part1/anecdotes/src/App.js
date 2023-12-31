import { useState } from "react"

function Anecdote({anecdote, votes}) {
	return(
	  	<>
	  		<p>{anecdote}</p>
	  		<p>Has {votes} votes</p>
	  	</>
	);
}

function Button({text, handleClick}) {
	return(
		<>
			<button onClick={handleClick}>{text}</button>
		</>
	);
}

function App() {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well."
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

	function selectRandom() {
		let rand;
		// Avoids selecting the same number again
		while((rand=Math.floor(Math.random()*anecdotes.length)) == selected);
		setSelected(rand);
	}

	function vote() {
		let votesCopy = [...votes];
		++votesCopy[selected];
		setVotes(votesCopy);
	}

	const topAnecdote = () => votes.indexOf(Math.max(...votes));

	return(
	  	<>
	  		<h1>Anecdote of the day</h1>
	  		<Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />

	  		<Button text="Vote" handleClick={vote} />
	  		<Button text="Next Anecdote" handleClick={selectRandom} />

	  		<h1>Most voted anecdote</h1>
	  		<Anecdote anecdote={anecdotes[topAnecdote()]} votes={votes[topAnecdote()]}/>
	  	</>
	);
}

export default App;
