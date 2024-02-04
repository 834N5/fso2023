import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	const handleLogin = (event) => {
		event.preventDefault()
		loginService.login({username, password}).then(response => {
			window.localStorage.setItem("loggedInUser", JSON.stringify(response))
			setUser(response)
			setUsername("")
			setPassword("")
		})
	}

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem("loggedInUser")
	}

	const handleBlogCreation = (event) => {
		event.preventDefault()
		blogService.create({title, author, url}, user.token).then(response => {
			setBlogs(blogs.concat(response))
			setTitle("")
			setAuthor("")
			setUrl("")
		}).catch(() => {
			setTitle("")
			setAuthor("")
			setUrl("")
		})
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
				<p>
					<b>{user.name}</b> is logged in
					<button onClick={handleLogout}>logout</button>
				</p>
				<h2>Add new blog</h2>
				<form onSubmit={handleBlogCreation}>
					<div>
						<label for="title">title</label>
						<input
							type="text"
							name="title"
							value={title}
							onChange={({target}) => setTitle(target.value)}
						/>
					</div>
					<div>
						<label for="author">author</label>
						<input
							type="text"
							name="author"
							value={author}
							onChange={({target}) => setAuthor(target.value)}
						/>
					</div>
					<div>
						<label for="url">url</label>
						<input
							type="text"
							name="url"
							value={url}
							onChange={({target}) => setUrl(target.value)}
						/>
					</div>
					<div>
						<input type="submit" value="Create" />
					</div>
				</form>
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
