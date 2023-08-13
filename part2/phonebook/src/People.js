function People({people, search})
{
	return(
		<>
			{people.map(people => {
				if (people.name.toLowerCase().includes(search.toLowerCase()))
					return(<p key={people.id}>{people.name} {people.number}</p>)
				}
			)}
		</>
	);
}

export default People;
