// Servidor express (NodeJS)
const express = require('express');
const app = express();
// Servidor de Sockets
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Desplegar el directorio Public
// para que pueda ser visto en el browser
app.use(express.static(`${__dirname}/public`));

io.on('connection', client => {
    console.log(`Cliente conectado ID: ${client.id}`);

    // client.emit('msj-welcome', {
    //     msg: `Bienvenido cliente ID: ${client.id}`,
    //     fecha: new Date().toDateString()
    // });

    client.on('msg-to-server', data => {
        console.log(`Mensaje de nuestro cliente.`, data);

        // Emite a todos los clientes conectados
        io.emit('msg-from-server', data);
    });

    client.on('disconnect', () => {
        console.log(`Adios cliente ID: ${client.id}`);
    });
});

server.listen(8080, () => {
    console.log('Server ejecutando en el puerto 8080');
});