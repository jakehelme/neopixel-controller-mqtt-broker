let mosca = require('mosca');

let ascoltatore = {
	//using ascoltatore
	type: 'mongo',
	url: process.env.MQTT_BROKER_MONGODB,
	pubsubCollection: process.env.MQTT_DB,
	mongo: {}
};

let settings = {
	port: 1883,
	backend: ascoltatore
};

let server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
	console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet) {
	console.log('Published', packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
	console.log('Mosca server is up and running');
}
