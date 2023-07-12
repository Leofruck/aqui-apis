
const express = require('express');
const livroController = require('../controller/livroController');


const router = express.Router();


router.get('/', livroController.listarlivro);
router.get('/:id', livroController.buscarPorId);
router.post('/', livroController.inserirlivro);
router.put('/:id', livroController.atualizalivro);
router.delete('/:id', livroController.deletarlivro);



module.exports = router;