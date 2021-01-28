const amqp = require('amqplib/callback_api')

const amqpURL = 'amqps://lquhwviv:senha_abc_1234@jackal.rmq.cloudamqp.com/lquhwviv'

const stdin = process.openStdin();

amqp.connect(amqpURL, (err, conn) => {
    if(err) throw err
    conn.createChannel((err, channel) => {
        if(err) throw err
        const exchange = 'amq.topic';
        channel.assertExchange(exchange, 'topic', {durable: true});



        stdin.addListener("data", (data) => {
            command = data.toString().trim().replace(/\n/, '')
            if(command.toString().includes(':')){
                const commands = command.toString().replace(/\n/, '').split(':');
                const topico = commands[0];
                const mensagem = commands[1];
                if(topico.match(/(unoesc\.)(prog4\.(\*|[\w]+)|[\#])/g)){
                    channel.publish(exchange, topico, Buffer.from(mensagem));
                    console.log(`mensagem publicada para o topico: ${topico}`);                                }
            }
        });
        

    });
});
