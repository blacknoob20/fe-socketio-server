class Sockets {
    constructor(io) {
        this.io = io;

        this.socketsEvents();
    }

    socketsEvents() {

        this.io.on('connection', client => {
            console.log(`Cliente conectado ID: ${client.id}`);

            // client.emit('msj-welcome', {
            //     msg: `Bienvenido cliente ID: ${client.id}`,
            //     fecha: new Date().toDateString()
            // });

            client.on('msg-to-server', data => {
                console.log(`Mensaje de nuestro cliente.`, data);

                // Emite a todos los clientes conectados
                this.io.emit('msg-from-server', data);
            });

            client.on('disconnect', () => {
                console.log(`Adios cliente ID: ${client.id}`);
            });
        });

    }
}

module.exports = Sockets;