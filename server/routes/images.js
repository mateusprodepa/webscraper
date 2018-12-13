const router = require("express").Router();

const { getRandomImage, searchForImages } = require('../utils/images');

const pinterest = require('../config/pinterest');
const baseUrl = pinterest.defaultQueryString;

String.prototype.isValid = function() {
    return !!this || typeof this === 'string' ? true : false;
}

router.get('/:query/:quantity', async (req, res) => {
    const { query: imageQuery, quantity } = req.params;
    if(imageQuery.isValid()) {
        let images;

        if(!!quantity && quantity > 0) {
            images = (await searchForImages(baseUrl + imageQuery)).slice(0, quantity);
        } else {
            images = [getRandomImage(await searchForImages(baseUrl + imageQuery))];
        }

        if(images.length)
            res.status(200).send({ images: images });
        else
            res.status(403).send({ error: 'Não foi possivel carregar sua imagem' });

    } else {
        res.status(403).send({ error: 'Não deixe o campo de pesquisa em branco.' });
    }
});

module.exports = router;