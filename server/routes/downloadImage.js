const _id = require('shortid');
const router = require("express").Router();
const download = require('../utils/download');
const path = require('path');

const { getRandomImage, searchForImages } = require('../utils/images');

const pinterest = require('../config/pinterest');
const baseUrl = pinterest.defaultQueryString;

router.get('/:query', async (req, res) => {
    const { query: imageQuery } = req.params;
    if(imageQuery.isValid()) {
        let downloaded;
        let filename = `${imageQuery}-${_id.generate()}`

        const image = getRandomImage(await searchForImages(baseUrl + imageQuery));
        const imagePath = path.join(__dirname, '../downloads', filename + '.jpg');

        downloaded = await download(image, imagePath);

        if (downloaded)
            res.status(200).send({ status: ('Download da imagem efetuado com sucesso em ' + imagePath) });
        else
            res.status(403).send({ error: 'Não foi possível baixar a imagem' });

    } else {
        res.status(403).send({ error: 'Não deixe o campo de pesquisa em branco.' });
    }
});

module.exports = router;