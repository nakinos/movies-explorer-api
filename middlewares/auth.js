const jwt = require('jsonwebtoken');
const { JWT_SECRET_DEV } = require('../constants/dev-env');
const { UnauthorizedErrorMessage } = require('../constants/error-message');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError(UnauthorizedErrorMessage);
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw new UnauthorizedError(UnauthorizedErrorMessage);
  }

  req.user = { _id: payload._id };

  return next();
};
