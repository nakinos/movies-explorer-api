const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
const { InvalideEmailPasswordMessage } = require('../constants/error-message');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(InvalideEmailPasswordMessage);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(InvalideEmailPasswordMessage);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
