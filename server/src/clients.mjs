import * as io from "socket.io";
import Client from "./client.mjs";

export default class Clients {
  websockets_server;

  constructor(http_server, clients = [], on_subscription_callbacks =[]) {
    this.http_server = http_server;
    this.clients = clients;
    this.on_subscription_callbacks = on_subscription_callbacks;
  }

  start() {
    this.websockets_server = new io.Server(this.http_server, {
      pingTimeout: 30000,
      cors: {origin: '*',}
    });

    this.websockets_server.on("connection", (socket) => {
      console.log(`Received: 'connection'`)
      const client = new Client(socket);
      this.add(client);

      socket.on('subscribe', data => {
        console.log(`Received: 'subscribe' to [${data.location}:${data.field}]`)
        client.subcribe_to(data.location, data.field);
        this.on_subscription_callbacks.forEach(callback => callback(data));
      });
      socket.on('start', () => {
        console.log(`Received: 'start'`)
        client.ready()
      });
      socket.on('stop', () => {
        console.log(`Received: 'stop'`)
        client.standby()
      });
      socket.on('disconnect', () => {
        console.log(`Received: 'disconnect'`)
        this.remove(client)
      });

      socket.emit('connected');
    });
  }

  remove(client_to_remove) {
    this.clients = this.clients.filter(client => client.equals(client_to_remove));
  }

  add(client) {
    this.clients.push(client);
  }

  subscribed_to(location, field) {
    return new Clients(this.http_server, this.clients.filter(client => client.is_subscribed_to(location, field)));
  }

  ready() {
    return new Clients(this.http_server, this.clients.filter(client => client.is_ready()));
  }

  send(data) {
    this.clients.forEach(client => client.send(data));
  }

  on_subscription(callback) {
    this.on_subscription_callbacks.push(callback);
  }
}

