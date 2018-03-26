/*var firebase = require('firebase');
var hapi = require('hapi');

var firebaseConfig = {
    apiKey: "AIzaSyCPwcQukNtEsF9655UqBuO_LLtFLjvA1jc",
    authDomain: "kalki-ibot.firebaseapp.com",
    databaseURL: "https://kalki-ibot.firebaseio.com",
    projectId: "kalki-ibot",
    storageBucket: "kalki-ibot.appspot.com",
    messagingSenderId: "1051053794077"
	};
firebase.initializeApp(firebaseConfig);

var hapiServer = new hapi.Server({
	host : 'localhost',
	port : 5000
});

hapiServer.route({
	method: 'GET',
	path: '/',
	handler: function(request, h){
		console.log("Hello get!");
		return 'Hello get!';
	}
});

hapiServer.route({
	method: 'POST',
	path: '/test',
	handler: function(request, h){
		console.log("Hello post!");
		console.log(request.payload)
		return "Hello post!";
	}
});



async function start(){
	try{
		await hapiServer.start();
	}
	catch(err){
		console.log(err);
		process.exit(1);
	}
	console.log("Server running at: ", hapiServer.info.uri);
}

start();*/