var functions = require('firebase-functions');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");
var ajax = require("ajax-request");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var telegramToken = "568999963:AAG_fUNvvp8W_fcgi8Fc_P2C0mwI5RemAlI";

app.get('/', (request, response) => {

	/*var sendMessageConfig = {
		defaultResponse : "Please wait until I get smarter!",
		hostname : "https://api.telegram.org/bot" + telegramToken + "/sendMessage?chat_id=" + "302362320" + "&text=" + "Please wait until I get smarter!",
		method : "GET"  
	}

	var sendMessage = http.request(sendMessageConfig, (sendMessageResponse) => {

		sendMessageResponse.on('end', () => {
			console.log(sendMessageResponse);
			
		});
		
	});

	sendMessage.write("1234");
	sendMessage.end();
*/
	response.send("Hello royalty! If you can see this, it means that Poochi is bloody amaazing! :D");
	

});



app.get('/test', (request, response) => {
	param = {
		"message" : {
			"text" : "Test endpoint"
		}
	}
	res = sendDefaultResponse(param);
	response.send(res);
}); 

app.post('/testpost', (request, response) =>{
	response.send(JSON.stringify(request.body) + "Post endpoint works");
});

app.post('/telegramMessage', (request, response) =>{
	console.log(request.body);
	console.log(request.body["result"]["metadata"]);
	//result = sendDefaultResponse(request.body["message"]["text"]);
	result = {
	  "speech": "this text is spoken out loud if the platform supports voice interactions",
	  "displayText": "this text is displayed visually",
	  "data": {
		  	"google": {
		      	"expectUserResponse": true,
		      	"richResponse": {
		        	"items": [
			          	{
			           	 	"simpleResponse": {
			            	  	"textToSpeech": "this is a simple response"
			            	}	
			          	}
		        	]
		      	}
	    	},
	    	"telegram": {
	      		"text": "This is a text response for Slack."
		    },	
	    
	  }
	}
	console.log(result);
	return response.json(result);
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);

/*function sendDefaultResponse(message){
	request("https://api.telegram.org/bot568999963:AAG_fUNvvp8W_fcgi8Fc_P2C0mwI5RemAlI/sendMessage?chat_id=302362320&text=Hey", function(error, response, body){
		console.log("Error: " + error)
		console.log("Response: " + response);
		console.log("Body: " + body);
		
	});

	return("returned");
}

function sendAjax(){
	ajax({
	url: "https://api.telegram.org/bot568999963:AAG_fUNvvp8W_fcgi8Fc_P2C0mwI5RemAlI/sendMessage?chat_id=302362320&text=Hey!",
	method: "GET"}, function(err, res, body){
			console.log("Error: " + err);
			console.log(res);
			console.log("Response: " + res);
			console.log("Body: " + body);
			response.send(res["headers"]);
	});
}*/