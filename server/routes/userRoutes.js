const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/verify').post(authController.protect)

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

router.patch(
    '/updateMyPassword',
    authController.protect,
    authController.updatePassword
  );


// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.creatUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
