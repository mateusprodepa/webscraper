const { log, loadLogger } = require('./utils/log');
const logger = loadLogger(true);
const express = require('express');
const mongoose = require('mongoose');
const pino = require('express-pino-logger')(logger);
const connection = mongoose.connect('mongodb://localhost/PinScrapper', {
    useNewUrlParser: true
});
// const swagger = require('./config/swagger');
const app = express();

const imagesRoute = require('./routes/images');
const downloadImageRoute = require('./routes/downloadImage');

const port = process.env.PORT || 3000;

// app.register(require('fastify-swagger'), swagger.options);

app.use(pino);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use('/images', imagesRoute);
app.use('/download', downloadImageRoute);

app.listen(port, () => console.info(`[x] => Servidor rodando na porta ${port}`));