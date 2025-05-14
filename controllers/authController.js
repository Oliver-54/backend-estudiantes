const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.registrar = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { correo, contraseña } = req.body;
  const hash = await bcrypt.hash(contraseña, 10);
  const usuario = new Usuario({ correo, contraseña: hash });
  await usuario.save();
  res.status(201).send('Usuario creado');
};

exports.login = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { correo, contraseña } = req.body;
  const usuario = await Usuario.findOne({ correo });
  if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
    return res.status(401).send('Credenciales inválidas');
  }

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
