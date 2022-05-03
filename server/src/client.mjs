export default class Client {
  socket;
  subscriptions;
  status;

  constructor(socket, subscriptions = [], status = 'standby') {
    this.socket = socket;
    this.subscriptions = subscriptions;
    this.status = status;
  }

  subcribe_to(location, field) {
    this.subscriptions.push({
      location: location,
      field: field
    });
  }

  is_subscribed_to(location, field) {
    return this.subscriptions.some(subscription => {
      return subscription.location === location &&
        subscription.field === field;
    });
  }

  is_ready() {
    return this.status === 'ready';
  }

  ready() {
    this.status = 'ready';
  }

  standby() {
    this.status = 'standby';
  }

  send(data) {
    this.socket.emit('data', data);
  }

  id() {
    return this.socket.id;
  }

  equals(other) {
    if (!(other instanceof Client))
      return false;

    return this.id() === other.id();
  }
}
