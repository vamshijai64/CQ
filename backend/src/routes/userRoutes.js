const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')

// Social login
router.post('/social-register', userController.socialRegister);
// router.post('/social-login', userController.socialLogin);


// Mobile login
// router.post('/mobile-register', userController.mobileRegister);
// router.post('/request-otp', userController.requestOtp);
// router.post('/mobile-login', userController.mobileLogin);


// router.post('/register', userController.registerUser)
// router.post('/request-otp', userController.requestOtp)
// router.post('/login', userController.loginUser)

module.exports = router;