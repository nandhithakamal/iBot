var functions = require('firebase-functions');
var firebase = require('firebase');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");
var ajax = require("ajax-request");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var telegramToken = "568999963:AAG_fUNvvp8W_fcgi8Fc_P2C0mwI5RemAlI";

var firebaseConfig = {
    apiKey: "AIzaSyCPwcQukNtEsF9655UqBuO_LLtFLjvA1jc",
    authDomain: "kalki-ibot.firebaseapp.com",
    databaseURL: "https://kalki-ibot.firebaseio.com",
    projectId: "kalki-ibot",
    storageBucket: "kalki-ibot.appspot.com",
    messagingSenderId: "1051053794077"
	};
firebase.initializeApp(firebaseConfig);

app.get('/', (request, response) => {
	response.send("App is functional");
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
	var realtimeDBReference = firebase.database().ref("events/");

	/*realtimeDBReference.push({
        "name": "Rajhesh Vaidhya's concert",
        "time": "6:00 pm",
        "venue": "MVB front lawn",
        "duration": "2 hours",
        "date": "21.03.2018"
	});*/

	//var responseToSend = "Default telgram response";

	intent = request.body["result"]["metadata"]["intentName"];


	/*if (intent === "Get Event Intent"){
		time = request.body["result"]["parameters"]["time"];
		date = request.body["result"]["parameters"]["date"];
		venue = request.body["result"]["parameters"]["venue"];
		realtimeDBReference.orderByChild("venue").equalTo("Auditorium").on("child_added", (snapshot) =>{
			snapshot.forEach((childSnap) => {
				console.log("Child snap");
				console.log(childSnap);
			});

		});
	}*/

	if (intent === "Get Event Details Intent"){
		event = request.body["result"]["parameters"]["event"];
		realtimeDBReference.orderByChild("name").equalTo(event).on("child_added", (snapshot) => {
			eventDictionary = snapshot.val();	
			message = eventDictionary["name"] + " is at " + eventDictionary["time"] + " on " + eventDictionary["date"] + " at " + eventDictionary["venue"];
			responseToSend = {
				"displayText": message,
			  	"speech": message,
			  
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
			      		"text": message
				    }	
			    
			  	}
			}
		//console.log(result);
		return response.json(responseToSend);
		});
	}
	

	/*result = {
		"displayText": responseToSend,
	  	"speech": responseToSend,
	  
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
	      		"text": responseToSend
		    }	
	    
	  }
	}
	console.log(result);
	return response.json(result);*/
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