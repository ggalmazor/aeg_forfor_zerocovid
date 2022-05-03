import {Sensors} from "./sensors.mjs";
import {Clients} from "./clients.mjs";


const sensors = new Sensors();

const clients = new Clients();
clients.start();



sensors.on_value((location, field, value) => {
  clients.subscribed_to(location, field).ready().send({location, field, value});
});
