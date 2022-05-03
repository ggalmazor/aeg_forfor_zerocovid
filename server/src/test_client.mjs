import {io} from "socket.io-client";

const socket = io("ws://localhost:3000", {
  reconnectionDelay: 1_000
});

socket.on('connected', () => {
  console.log("Received: 'connected'");
  socket.emit('subscribe', {location: 'aeg', field: 'temperature'});
  socket.emit('subscribe', {location: 'aeg', field: 'humidity'});
  socket.emit('start');
})

socket.on('data', data => {
  console.log(data)
});
