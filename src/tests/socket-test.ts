import { io } from 'socket.io-client';

const socket = io('http://localhost:3333', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('ticket.created', (data) => {
  console.log('EVENT ticket.created:', data);
});

socket.on('ticket.updated', (data) => {
  console.log('EVENT ticket.updated:', data);
});

socket.on('ticket.deleted', (data) => {
  console.log('EVENT ticket.deleted:', data);
});

socket.on('comment.created', (data) => {
  console.log('EVENT comment.created:', data);
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);
});