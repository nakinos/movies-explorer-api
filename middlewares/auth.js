const jwt = require('jsonwebtoken');
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
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError(UnauthorizedErrorMessage);
  }

  req.user = { _id: payload._id };

  return next();
};
