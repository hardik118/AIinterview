import express from 'express';
import http from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';

import setupInterviewWS from './ws/setupInterview';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// REST API routes

// WebSocket setup (for interviews)
const wss = new WebSocketServer({ server, path: '/interview' });
setupInterviewWS(wss);

// Health check
app.get('/', (_, res) => {
  res.send('Server is up 🚀');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
