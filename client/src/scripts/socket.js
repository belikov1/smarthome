import io from 'socket.io-client';

var socket = io.connect('http://localhost:3333', {
  reconnection: true,
});

export default socket;
