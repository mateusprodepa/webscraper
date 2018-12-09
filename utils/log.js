let isActive = false;

exports.log =  (type, message, restrict) => {
    const logger = require('fastify').log;
    if(isActive && restrict === false) {
        return logger[type](message);
    }

    if(!isActive) {
        return console[type](message);
    }
}

exports.loadLogger = (load) => {
    const loggerOptions = require('pino')({ 
        prettyPrint: {
            colorize: true,
            crlf: true,
            messageKey: false,
            translateTime: true
        }
    });

    if(load) {
        isActive = true;
        return { logger: loggerOptions }
    } else {
        return { logger: false }
    }
};