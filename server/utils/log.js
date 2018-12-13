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
        return { logger: loggerOptions }
    } else {
        return { logger: false }
    }
};