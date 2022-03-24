const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const { NotFoundUserMessage, ConflictUserMessage, BadRequestErrorMessage } = require('../constants/error-message');
const { SignOutMessage } = require('../constants/success-message');

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NotFoundUserMessage);
      }
      return res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcryptjs.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.send({
      name, email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(ConflictUserMessage));
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError(BadRequestErrorMessage));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NotFoundUserMessage);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError(BadRequestErrorMessage));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { _id } = user;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      return res.cookie('token', token, {
        maxAge: 604800000, // 7 day in second
        httpOnly: true,
      }).send({ _id });
    })
    .catch((err) => next(err));
};

module.exports.signout = (req, res) => {
  res.clearCookie('token').send({ message: SignOutMessage });
};
