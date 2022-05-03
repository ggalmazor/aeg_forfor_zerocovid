import Clients from "./clients.mjs";
import http from 'http';
import express from 'express';
import Sensors from "./sensors.mjs";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const http_server = http.createServer(app);

http_server.listen(port, () => {
  console.log(`Server activo en http://localhost:${port}`);
});

const clients = new Clients(http_server);
clients.start();

setTimeout(() => {
  console.log('send data')
  clients.subscribed_to("aeg", "temperature").ready().send({location: 'aeg', field: 'temperature', value: 10.0});
  clients.subscribed_to("aeg", "humidity").ready().send({location: 'aeg', field: 'humidity', value: 20.0});
}, 4_000);

const sensors = new Sensors();
sensors.on_value((location, field, value) => {
  clients.subscribed_to(location, field).ready().send({location, field, value});
})
