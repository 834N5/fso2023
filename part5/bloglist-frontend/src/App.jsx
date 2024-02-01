import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)	 
	}, [])

	const handleLogin = (event) => {
		event.preventDefault()
		loginService.login({username, password}).then(response =>
			setUser(response)
		)
	}

	/* delete later */
	const testShitPls = (event) => {
		console.log(event)
	}
	// <button onClick={testShitPls}>test</button>

	if (user) {
		return (
			<div>
				<h2>blogs</h2>
				<p>{user.username} is logged in</p>
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
		)
	}
	return (
		<div>
			<h2>login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label for="username">username</label>
					<input
						type="text"
						name="username"
						onChange={({target}) => setUsername(target.value)}
					/>
				</div>
				<div>
					<label for="password">password</label>
					<input
						type="password"
						name="password"
						onChange={({target}) => setPassword(target.value)}
					/>
				</div>
				<div>
					<input type="submit" value="login" />
				</div>
			</form>
		</div>
	)
}

export default App
