function Header({course})
{
	return(
		<>
			<h1>{course.name}</h1>
		</>
	);
}

function Part({name, exercises})
{
	return(
		<>
			<p>{name} {exercises}</p>
		</>
	);
}

function Content({course})
{
	return(
		<>
			{course.parts.map(parts =>
				<Part key={parts.id} name={parts.name} exercises={parts.exercises} />
			)}
		</>
	);
}

function Total({course})
{
	let sum = course.parts.reduce((s, p) => s + p.exercises, 0);
	return(
		<>
			<p>Number of exercises: {sum}</p>
		</>
	);
}

function Course({course})
{
	/* Use <Fragment> instead of <> if you want to use a key */
	return(
		<>
			{course.map(courses => {
				return(
					<div key={courses.id}>
						<Header course={courses} />
						<Content course={courses} />
						<Total course={courses} />
					</div>
				)}
			)}
		</>
	);
}

export default Course;
