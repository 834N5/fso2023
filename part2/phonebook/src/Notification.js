import "./main.css";

function Notification({message})
{
	if(message) {
		return(
			<>
				<p className="success">{message}</p>
			</>
		);
	}
}

export default Notification;
