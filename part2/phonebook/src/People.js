function People({people, search})
{
	return(
		<>
			{people.filter(people =>
				people.name.toLowerCase().includes(search.toLowerCase())
			).map(people =>
				<p key={people.id}>{people.name} {people.number}</p>
			)}
		</>
	);
}

export default People;
