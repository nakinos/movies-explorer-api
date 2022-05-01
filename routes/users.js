const router = require('express').Router();
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const {
  updateUserValidation,
} = require('../valdation/users');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;
