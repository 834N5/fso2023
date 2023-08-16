function People({people, search, remove})
{
	return(
		<>
			{people.filter(people =>
				people.name.toLowerCase().includes(search.toLowerCase())
			).map(people =>
				<div key={people.id}>
					{people.name} {people.number}
					<button onClick={() =>
						remove(people.id, people.name)}>
						delete
					</button>
				</div>
			)}
		</>
	);
}

export default People;
