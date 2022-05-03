import {Server as socket_io_server} from "socket.io";


export class Clients {
  #websockets_server;

  constructor(http_server, clients = []) {
    this.http_server = http_server;
    this.clients = clients;
  }

  start() {
    this.#websockets_server = new socket_io_server(this.http_server, {
      pingTimeout: 30000,
      cors: {origin: '*',}
    });

    this.#websockets_server.on("connection", (socket) => {
      const client = new Client(socket);
      this.#add(client);

      socket.on('subscribe', data => client.subcribe_to(data.location, data.field));
      socket.on('start', () => client.ready());
      socket.on('stop', () => client.standby());
      socket.on('disconnect', () => this.#remove(client));

      socket.emit('connected');
    });
  }

  #remove(client_to_remove) {
    this.clients = this.clients.filter(client => client.equals(client_to_remove));
  }

  #add(client) {
    this.clients.push(client);
  }

  subscribed_to(location, field) {
    return new Clients(this.clients.filter(client => client.is_subscribed_to(location, field)));
  }

  ready() {
    return new Clients(this.clients.filter(client => client.is_ready()));
  }

  send(data) {
    this.clients.forEach(client => client.send(data));
  }
}

class Client {
  #socket;
  #subscriptions;
  #status;

  constructor(socket, subscriptions = [], status = 'standby') {
    this.#socket = socket;
    this.#subscriptions = subscriptions;
    this.#status = status;
  }

  subcribe_to(location, field) {
    this.#subscriptions.push({
      location: location,
      field: field
    });
  }

  is_subscribed_to(location, field) {
    return this.#subscriptions.some(subscription => {
      return subscription.location === location &&
        subscription.field === field;
    });
  }

  is_ready() {
    return this.#status === 'ready';
  }

  ready() {
    this.#status = 'ready';
  }

  standby() {
    this.#status = 'standby';
  }

  send(data) {
    this.#socket.emit('data', data);
  }

  id() {
    return this.#socket.id;
  }

  equals(other) {
    if (!(other instanceof Client))
      return false;

    return this.id() === other.id();
  }
}
