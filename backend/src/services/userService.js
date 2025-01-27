const userModel = require('../models/userModel')
const validations = require('../middlewares/validations')
const Otp = require('../models/otpModel');
const otpUtils = require('../utils/otpUtils')

exports.registerUser = async ({ username, email, phoneNumber, loginType }) => {
    if (loginType === 'social') {
        
        if (!email) throw new Error('Email and password are required for social login.');
        const existingUser = await validations.isEmailRegistered(email);
        if (existingUser) throw new Error('User already registered with this email.');
        // const hashedPassword = await validations.hashPassword(password);
        // const newUser = new userModel({ username, email, password: hashedPassword, loginType });
        // const hashedPassword = await validations.hashPassword(password);
        const newUser = new userModel({ username, email, loginType });
        return await newUser.save();
    } else if (loginType === 'mobile') {
        if (!phoneNumber) throw new Error('Phone number is required for mobile login.');
        const existingUser = await userModel.findOne({ phoneNumber });
        if (existingUser) throw new Error('User already registered with this phone number.');
        const newUser = new userModel({ username, phoneNumber, loginType });
        return await newUser.save();
    } else {
        throw new Error('Invalid login type.');
    }
};

// exports.socialLogin = async ({ email, password }) => {
//     const user = await validations.isEmailRegistered(email);
//     if (!user) throw new Error('Invalid email or user does not exist.');
//     const validPassword = await validations.comparePassword(password, user.password);
//     if (!validPassword) throw new Error('Invalid password.');
//     return user;
// };

// exports.mobileLogin = async ({ phoneNumber, otp }) => {
//     const user = await userModel.findOne({ phoneNumber });
//     if (!user) throw new Error('Invalid phone number or user does not exist.');

//     const otpRecord = await Otp.findOne({ phoneNumber, otp });
//     if (!otpRecord) throw new Error('Invalid OTP. Please try again.');
//     if (otpRecord.expiresAt < Date.now()) throw new Error('OTP has expired.');
//     if (otpRecord.status === 'used') throw new Error('This OTP has already been used.');

//     otpRecord.status = 'used';
//     await otpRecord.save();

//     return user;
// };

// exports.requestOtp = async (phoneNumber) => {
//     const user = await userModel.findOne({ phoneNumber });
//     if (!user) throw new Error('User with this phone number does not exist.');

//     const generatedOtp = otpUtils.generateOtp();
//     const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

//     // Save OTP in the database with phoneNumber
//     const otpRecord = new Otp({
//         phoneNumber,
//         otp: generatedOtp,
//         expiresAt: expirationTime,
//     });

//     await otpRecord.save();

//     await otpUtils.sendOtp(phoneNumber, generatedOtp); // Send OTP to the user's phone
//     return { message: 'OTP sent successfully.' };
// };


// // Store OTP temporarily (in-memory for simplicity, consider using a session or database in production)
// // let otpStore = {}; // Format: { email: otp }

// exports.registerUser = async (email, password, phoneNumber) => {
//     // const { email, password, phoneNumber } = userData;
//     const existingUser = await validations.isEmailRegistered(email)
//     if (existingUser) {
//         throw new Error('User already registered with this email');
//     }

//     const hashedPassword = await validations.hashPassword(password);
//     const newUser = new userModel({email, password: hashedPassword, phoneNumber});
//     return await newUser.save();
// };

// // Request OTP with email and password, and otp will be sent to registered mobile
// // exports.requestOtp = async ({ email, password }) => {
// //     const existingUser = await validations.isEmailRegistered(email)
// //     if (!existingUser) {
// //         throw new Error('Invalid email, please enter a valid email.');
// //     }

// //     const validPassword = await validations.comparePassword(password, existingUser.password);
// //     if (!validPassword) {
// //         throw new Error('Invalid password, please enter a valid password');
// //     }

// //     const generatedOtp = otpUtils.generateOtp();
// //     otpStore[email] = generatedOtp;  // Store OTP temporarily

// //     await otpUtils.sendOtp(existingUser.phoneNumber, generatedOtp);

// //     return existingUser;
// // };

// exports.requestOtp = async (email, password, phoneNumber) => {
//     const existingUser = await validations.isEmailRegistered(email)
//     if (!existingUser) {
//         throw new Error('Invalid email, please enter a valid email.');
//     }

//     const validPassword = await validations.comparePassword(password, existingUser.password);
//     if (!validPassword) {
//         throw new Error('Invalid password, please enter a valid password');
//     }

//     if(phoneNumber !== existingUser.phoneNumber) {
//         throw new Error('This mobile number not registered with this email')
//     }

//     const generatedOtp = otpUtils.generateOtp();
//     // otpStore[email] = generatedOtp;  // Store OTP temporarily
//     const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

//     // Save OTP in the database
//     const otpRecord = new Otp({ email: email, otp: generatedOtp, expiresAt: expirationTime, });

//     await otpRecord.save();
    
//     await otpUtils.sendOtp(existingUser.phoneNumber, generatedOtp);

//     return existingUser;
// };

// exports.loginUser = async ({ email, otp }) => {
//     const existingUser = await validations.isEmailRegistered(email)
//     if (!existingUser) {
//         throw new Error('Invalid email, please enter a valid email.');
//     }

//     // if (otp !== otpStore[email]) {
//     //     throw new Error('Invalid OTP. Please try again.');
//     // }

//     const otpRecord = await Otp.findOne({ email: email, otp: otp });
    
//     // Check if OTP exists, hasn't expired, and is still in 'sent' status
//     if(!otpRecord) {
//         throw new Error('Invalid OTP. Please try again')
//     }

//     if(otpRecord.status === 'used') {
//         throw new Error('This OTP has already been used')
//     }

//     if(otpRecord.expiresAt < Date.now()) {
//         throw new Error('OTP has expired.')
//     }

//     otpRecord.status = 'used';
//     await otpRecord.save();

//     // // Optionally delete the OTP from the database
//     // await Otp.deleteOne({email: email, otp: otp})

//     // delete otpStore[email];
//     return existingUser;
// };
