
const express = require('express');
const clienteController = require('../controller/clienteController');

const router = express.Router();

router.get('/', clienteController.listarCliente);
router.get('/:id', clienteController.buscarPorId);
router.post('/', clienteController.inserirCliente);
router.put('/:id', clienteController.atualizaCliente);
router.delete('/:id', clienteController.deletarCliente);

module.exports = router;