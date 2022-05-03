import mqtt from 'mqtt';

const broker_options = {
  host: "18.202.49.226",
  port: 1883,
  protocol: 'mqtt',
  rejectUnauthorized: false,
};
const mqtt_client = mqtt.connect(broker_options);

mqtt_client.on('connect', () => {
  console.log(`Connected to: 18.202.49.226 broker`);
  mqtt_client.subscribe('aeg/humidity');
  mqtt_client.subscribe('aeg/temperature');
  mqtt_client.subscribe('aeg/interior_co2');
  mqtt_client.subscribe('aeg/exterior_co2');
});

mqtt_client.on('message', function (topic, message) {
  switch (topic) {
    case 'aeg/temperature':
      console.log(`Topic: ${topic} Message: ${message}`);
      websockets_server.sockets.emit ('temperature', message.toString());
      break;
    case 'aeg/humidity':
      console.log(`Topic: ${topic} Message: ${message}`);
      websockets_server.sockets.emit ('humidity', message.toString());
      break;
    case 'aeg/exterior_co2':
      console.log(`Topic: ${topic} Message: ${message}`);
      websockets_server.sockets.emit ('exterior_co2', message.toString());
      break;
    case 'aeg/interior_co2':
      console.log(`Topic: ${topic} Message: ${message}`);
      websockets_server.sockets.emit ('interior_co2', message.toString());
      break;
  }
});

export default mqtt;
