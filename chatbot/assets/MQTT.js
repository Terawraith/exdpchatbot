// SETUP MQTT ------------------------------------------

const broker = "test.mosquitto.org";
const port = 8081 ;
const secured = true;
const topic="exdpchatbot";
const myID = "id" + parseInt(Math.random() * 100000, 10);



// CONNECT ----------------------------------------------

let client = new Paho.MQTT.Client( broker, port, myID);
console.log("let client: ");
console.log(client);

	// function to trigger connection

	// connect the client
	client.connect({
		onSuccess: onConnect,
		useSSL: secured,
	});
	// client.connect({onSuccess: onConnect, useSSL:secured});


// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = receiveMessage;


// MQTT Handler functions--------------------------------

	// called when the client connects
function onConnect() 
{
	console.log(myID + " connected");
	client.subscribe(topic); 
};

	// call to send a message
function sendMessage(msg) {
	// document.cookie = "username=" + clientIdReceived;    
	 console.log("sendMessage: " )
	 console.log(msg);
	 let mObj = { deviceId: myID, content: msg };
	 let mSend = new Paho.MQTT.Message(JSON.stringify(mObj));
	 mSend.destinationName = topic;
	 console.log("mSend: ");
	 console.log(mSend);
	 client.send(mSend);
}

	// called when a message arrives
// called when a message arrives
function receiveMessage(msg) {
  console.log("msg recieved: ");
  console.log(msg);
    let mUnpack = JSON.parse(msg.payloadString);
  console.log("mUnpack: ");
  console.log(mUnpack);
    let receivedMessage = mUnpack.content;
    let clientIdReceived = mUnpack.deviceId;
  console.log("clientRecieved: ");
  console.log(clientIdReceived);
    //let userCoords = [lat, lon];
  console.log("recievedMessage: ")
  console.log(receivedMessage);
    

}

	// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}




