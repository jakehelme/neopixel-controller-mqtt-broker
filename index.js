const readlineSync = require('readline-sync');
let mosca = require('mosca');

if (!process.env.MQTT_BROKER_MONGODB && !process.env.MQTT_DB) {
	const connectionString = readlineSync.question('Connection string: ');
	const collection = readlineSync.question('Collection: ');
	process.env.MQTT_BROKER_MONGODB = connectionString;
	process.env.MQTT_DB = collection;
}

function startBroker() {
	let backend = {
		//using ascoltatore
		type: 'mongo',
		url: process.env.MQTT_BROKER_MONGODB,
		pubsubCollection: process.env.MQTT_DB,
		mongo: {}
	};

	let settings = {
		port: 1883,
		backend
	};

	let server = new mosca.Server(settings);

	server.on('clientConnected', function (client) {
		console.log('client connected', client.id);
	});

	// fired when a message is received
	server.on('published', function (packet) {
		console.log('Published', packet.payload);
	});

	server.on('ready', () => { console.log('Mosca server is up and running'); });
}

startBroker();
