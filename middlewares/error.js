const { DefaultErrorMessage } = require('../constants/error-message');

module.exports = (err, req, res, next) => {
  const code = err.statusCode || 500;
  const message = err.message || DefaultErrorMessage;

  res.status(code).send({ message });
  next();
};
