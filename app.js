import dotenv from 'dotenv';
dotenv.config();


import {Server} from './models/server.js';




//creacion instancia del servidor
const server = new Server();





//levantando servidor
server.listen();
