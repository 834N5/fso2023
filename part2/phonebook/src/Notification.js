import "./main.css";

function Notification({messages})
{
	if(messages.length) {
		return(
			<>
				{messages.map(messages =>
					<p key={messages.key}
					   className={messages.type}>
						{messages.message}
					</p>
				)}
			</>
		);
	}
}

export default Notification;
