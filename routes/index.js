const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, signout, createUser } = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../valdation/users');
const NotFoundError = require('../errors/NotFoundError');
const { NotFoundEndpointMessage } = require('../constants/error-message');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

router.use(auth);

router.post('/signout', signout);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', () => {
  throw new NotFoundError(NotFoundEndpointMessage);
});

module.exports = router;
