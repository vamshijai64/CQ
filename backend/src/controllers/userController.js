const userService = require('../services/userService')

exports.socialRegister = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await userService.registerUser({ username, email, loginType: 'social' });
        res.json({ message: 'User registered successfully for social login', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.socialRegister = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const user = await userService.registerUser({ username, email, password, loginType: 'social' });
//         res.json({ message: 'User registered successfully for social login', user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.socialLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await userService.socialLogin({ email, password });
//         res.status(200).json({ message: 'Social login successful', user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.mobileRegister = async (req, res) => {
//     try {
//         const { username, phoneNumber } = req.body;
//         const user = await userService.registerUser({ username, phoneNumber, loginType: 'mobile' });
//         res.json({ message: 'User registered successfully for mobile login', user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.requestOtp = async (req, res) => {
//     try {
//         const { phoneNumber } = req.body;

//         if (!phoneNumber) {
//             return res.status(400).json({ error: 'Phone number is required' });
//         }

//         await userService.requestOtp(phoneNumber);
//         res.status(200).json({ message: 'OTP sent to your phone number' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.mobileLogin = async (req, res) => {
//     try {
//         const { phoneNumber, otp } = req.body;
//         const user = await userService.mobileLogin({ phoneNumber, otp });
//         res.status(200).json({ message: 'Mobile login successful', user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };





// exports.registerUser = async (req, res) => {
//     try {
//         const { email, password, phoneNumber } = req.body;
//         const user = await userService.registerUser(email, password, phoneNumber);
//         res.json({ message: 'User registered succesfully', user});
//     } catch (error) {
//         res.status(500).json({ error: error.message  });
//     }
// };

// Request OTP with email and password, and otp will be sent to registered mobile
// exports.requestOtp = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await userService.requestOtp({ email, password });
//         res.status(200).json({ message: 'OTP sent to your phone number' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.requestOtp = async (req, res) => {
//     try {
//         const { email, password, phoneNumber } = req.body;

//         const user = await userService.requestOtp(email, password, phoneNumber);
//         res.status(200).json({ message: 'OTP sent to your phone number' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.loginUser = async (req, res) => {
//     try {
//         const { email, otp } = req.body;

//         const user = await userService.loginUser({ email, otp });
//         res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };