var app = require('./config/server');

var server = app.listen(80, function () {
    console.log('Servidor ON');
})

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function (socket) {
    console.log('Me conectei');

    socket.on('disconnect', function () {
        console.log('Me desconectei');
    });

    socket.on('msgParaServidor', function (data) {
        socket.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            );

            socket.broadcast.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            );
        }
    });
});