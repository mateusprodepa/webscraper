// Configs
const swagger = require('./config/swagger');
const bodyParser = require('body-parser');

// Utils
const { log, loadLogger } = require('./utils/log');

const logger = loadLogger(true);
const fastify = require('fastify')( logger );

const port = process.env.PORT || 3000;

require('./routes').forEach(route => fastify.route(route));
fastify.register(require('fastify-swagger'), swagger.options);
fastify.use(bodyParser.json({ limit: '50mb' }));
fastify.use(bodyParser.urlencoded({ extended: false }));

const start = async () => {

    fastify.listen(port, (err, address) => {

        if(err) {
            return log('error', err);
            process.exit(1);
        }
        
        log('info', `Servidor rodando em ${address}`, true);
    });

}

fastify.ready().then(() => {
    fastify.swagger();
});

start();
