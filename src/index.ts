import 'express-async-errors';
import express, { Request, Response } from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import 'dotenv/config.js';
import errorMiddleware from './middlewares/error.js';
import boot from './services/boot.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import chatHandler from './chat.handler.js';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

// io.attachApp(app);

app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE,OPTIONS' }));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Welcome to backend!',
  });
});

io.on('connection', (socket) => {
  chatHandler(io, socket);
});

io.off('disconnect', (socket) => {
  console.log('lgo:::::, disconnected');
});

app.use('/api', routes);
app.use(errorMiddleware);

boot().then(() => {
  httpServer.listen(process.env.PORT || 5000, () => {
    console.log('log: connected');
  });
});
