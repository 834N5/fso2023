import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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
	const [messages, setMessages] = useState([])
	//fix


	useEffect(() => {
		setUser(JSON.parse(window.localStorage.getItem("loggedInUser")))
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	const handleLogin = (event) => {
		event.preventDefault()
		loginService.login({username, password}).then(response => {
			window.localStorage.setItem("loggedInUser", JSON.stringify(response))
			setUser(response)
			console.log(response)
			addMessage(`Welcome ${response.name}`, "success")
			setUsername("")
			setPassword("")
		}).catch(() => {
			addMessage("Invalid credentials", "error")
		})
	}

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem("loggedInUser")
	}

	const handleBlogCreation = (event) => {
		event.preventDefault()
		blogService.create({title, author, url}, user.token).then(response => {
			addMessage("blog created", "success")
			setBlogs(blogs.concat(response))
			setTitle("")
			setAuthor("")
			setUrl("")
		}).catch(error => {
			if (error.response.status == 400)
				addMessage("Failed to add blogs", "error")
			else
				addMessage("Failed to add blog", "error")
			setTitle("")
			setAuthor("")
			setUrl("")
		})
	}

	// type = success, error
	const addMessage = (message, type) => {
		/* Get lowest missing positive int */
		let keys = (messages.map(messages => messages.key))
		let key = 0;
		for (let i = 0; i < keys.length; ++i)
			while(keys[i] < keys.length && keys[i] !== i)
				[ keys[keys[i]], keys[i] ] = [ keys[i], keys[keys[i]] ]
		for (key = 0; key < keys.length; ++key)
			if (keys[key] !== key)
				break

		setMessages(messages => [...messages, {message, type, key}])
		setTimeout(() => {setMessages(messages => messages.slice(1))}, 5000)
	}

	/* delete later */
	const testShitPls = (event) => {
		console.log(event)
		addMessage("something", "success")
	}
	// <button onClick={testShitPls}>test</button>

	if (user) {
		return (
			<div>
				<button onClick={testShitPls}>test</button>
				<Notification messages={messages} />
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
			<button onClick={testShitPls}>test</button>
			<Notification messages={messages} />
			<h2>login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label for="username">username</label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={({target}) => setUsername(target.value)}
					/>
				</div>
				<div>
					<label for="password">password</label>
					<input
						type="password"
						name="password"
						value={password}
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
