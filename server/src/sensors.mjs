import mqtt from 'mqtt';

export default class Sensors {
  constructor(connections = [], on_value_callbacks = []) {
    this.connections = connections;
    this.on_value_callbacks = on_value_callbacks;
  }

  connect_to(ip, port) {
    const connection = mqtt.connect({
      host: ip,
      port: port,
      protocol: 'mqtt',
      rejectUnauthorized: false,
    });
    this.connections.push(connection);

    connection.on('message', (topic, message) => {
      console.log(`Topic: ${topic} Message: ${message}`);
      const [location, field] = topic.split("/");
      const value = parseFloat(message.toString());
      this.on_value_callbacks.forEach(callback => callback({location, field, value: value}));
    });

    connection.on('connect', () => console.log(`Connected to broker at ${ip}:${port}`));
  }

  on_value(callback) {
    this.on_value_callbacks.push(callback);
  }

  listen_to(location, field) {
    this.connections.forEach(connection => {
      const topic = `${location}/${field}`;
      console.log(`Subscribing to topic ${topic}`);
      connection.subscribe(topic);
    });
  }
}

