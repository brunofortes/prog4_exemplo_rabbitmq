const amqp = require('amqplib/callback_api')

const amqpURL = 'amqps://lquhwviv:senha_abc_1234@jackal.rmq.cloudamqp.com/lquhwviv'


amqp.connect(amqpURL, (err, conn) => {
    if(err) throw err

    conn.createChannel((err, channel) => {
        if(err) throw err

        const exchange = 'amq.topic';
        channel.assertExchange(exchange, 'topic', {durable: true});

        const keys = ['unoesc.prog4.bruno', 'unoesc.prog4.todos']

        channel.assertQueue('', {exclusive: false}, (err, q) => {
            if(err) throw err


            keys.forEach(key => {
                channel.bindQueue(q.queue, exchange, key);
            });
            
            channel.consume(q.queue, (message) => {
                console.log(message.content.toString());
            }, {noAck: true})

        });
    });
});