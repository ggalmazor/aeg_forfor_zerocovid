import { io } from "socket.io-client";

const socket = io("ws://localhost:3000", {});

socket.on('connected', () => {
  socket.emit('subscribe', {location: 'aeg', field: 'temperature'});
  socket.emit('start');
})

socket.on('data', data => console.log(data));
