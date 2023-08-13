function Search({search, onChange})
{
	return(
		<div>
			Search for name: <input value={search} onChange={onChange} />
		</div>
	);
}

export default Search;
