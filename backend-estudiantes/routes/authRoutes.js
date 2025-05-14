const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

// Registro con validación
router.post(
  '/registro',
  [
    check('correo').isEmail().withMessage('Debe ser un correo válido'),
    check('contraseña').isLength({ min: 6 }).withMessage('Debe tener mínimo 6 caracteres')
  ],
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
  authController.registrar
);

// Login sin validación (o puedes agregarla también)
router.post('/login', authController.login);

module.exports = router;

