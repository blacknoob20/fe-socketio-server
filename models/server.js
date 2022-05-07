const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {
        // Servidor express (NodeJS)
        this.app = express();
        this.port = process.env.PORT;
        // Servidor de Sockets
        this.server = http.createServer(this.app);
        // Configuraciones de sockets
        this.io = socketio(this.server, {/** configuraciones */ });
    }

    middlewares() {
        // Desplegar el directorio Public
        // para que pueda ser visto en el browser
        this.app.use(express.static(path.resolve(__dirname, `../public`)));
    }

    configuration() {
        new Sockets(this.io);
    }

    execute() {
        // Inicializar middlewares
        this.middlewares()
        // Inicializar sockets
        this.configuration();
        // Inicializar server
        this.server.listen(this.port, () => {
            console.log('Server ejecutando en el puerto 8080');
        });
    }
}

module.exports = Server;