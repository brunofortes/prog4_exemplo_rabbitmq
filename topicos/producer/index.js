const amqp = require('amqplib/callback_api')

const amqpURL = 'amqps://lquhwviv:senha_abc_1234@jackal.rmq.cloudamqp.com/lquhwviv'


amqp.connect(amqpURL, (err, conn) => {
    if(err) throw err
    conn.createChannel((err, channel) => {
        if(err) throw err
        const exchange = 'amq.topic';

        const keys = ['unoesc.prog4.*']
        // const keys = ['unoesc.prog4.bruno', 'unoesc.prog4.*', 'unoesc.#']

        channel.assertExchange(exchange, 'topic', {durable: true});
        keys.forEach(key => {
            console.log(`mensagem publicada para o topico: ${key}`);
            channel.publish(exchange, key, Buffer.from(`mensagem publicada para o topico: ${key}`));
        });
    });
});