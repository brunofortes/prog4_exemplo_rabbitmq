const amqp = require('amqplib/callback_api')

const amqpURL = 'amqps://lquhwviv:senha_abc_1234@jackal.rmq.cloudamqp.com/lquhwviv'


amqp.connect(amqpURL, (err, conn) => {
    conn.createChannel((err, channel) => {
        const queue = 'teste'
        channel.assertQueue(queue, {durable: true});
        for(var i = 0; i <= 10; i++){
            channel.sendToQueue(queue, Buffer.from(`teste envio de mensagem ${i}`));
        }
    });
});