
const express = require('express');
const autorController = require('../controller/autorController');

const router = express.Router();


router.get('/', autorController.listarAutores);
router.get('/:id', autorController.buscarAutorPorId);
router.post('/', autorController.inserirAutor);
router.put('/:id', autorController.atualizarAutor);
router.delete('/delete/:id', autorController.deletarAutor);

module.exports = router;