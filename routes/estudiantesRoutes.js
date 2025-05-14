const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const estudiantesController = require('../controllers/estudiantesController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, estudiantesController.listar);

router.post('/', auth, [
  body('nombre').trim().escape(),
  body('carrera').trim().escape(),
  body('edad').isInt({ min: 1 })
], estudiantesController.crear);

module.exports = router;
