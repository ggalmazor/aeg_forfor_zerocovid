import Clients from "./clients.mjs";
import http from 'http';
import express from 'express';
import Sensors from "./sensors.mjs";

const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
const http_server = http.createServer(app);

http_server.listen(port, () => {
  console.log(`Server activo en http://localhost:${port}`);
});


const clients = new Clients(http_server);
clients.start();

const sensors = new Sensors();
sensors.connect_to('18.202.49.226', 1883);

sensors.on_value(({location, field, value}) => {
  clients.ready().subscribed_to(location, field).send({location, field, value});
});

clients.on_subscription(({location, field}) => {
  sensors.listen_to(location, field);
});
