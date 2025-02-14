const userModel = require('../models/userModel')
const validations = require('../middlewares/validations')
const otpModel = require('../models/otpModel');
const otpUtils = require('../utils/otpUtils')



exports.registerUser = async ({ username, email, password, loginType }) => {
    if (loginType !== 'social') throw new Error('Invalid login type.');

    if (!email || !password) {
        throw new Error('Email and password are required for social login.');
    }

    const existingUser = await validations.isEmailRegistered(email);
    if (existingUser) {
        throw new Error('User already registered with this email.');
    }

    const hashedPassword = await validations.hashPassword(password);
    const newUser = new userModel({ username, email, password: hashedPassword, loginType });

    return await newUser.save();
};

exports.socialLogin = async ({ email, password }) => {
    const user = await validations.isEmailRegistered(email);
    if (!user) throw new Error('Invalid email or user does not exist.');

    const validPassword = validations.comparePassword(password, user.password);
    if (!validPassword) throw new Error('Invalid password.');
    return user;
};
exports.getUserById = async (userId) => {
    return await userModel.findById(userId, { password: 0 }).lean();
};

exports.getAllUsers = async () => {
    // return await userModel.find({ role: 'user' }, { password: 0 }).lean();
    // return await userModel.find({}, { password: 0, _id: 1 }).lean();
    return await userModel.find().select('-password').lean();
};

exports.updateUserProfile = async (userId, updateData) => {
    const user = await userModel.findById(userId).lean();
    if (!user) throw new Error('User not found');
    
    return await userModel.findByIdAndUpdate(userId, updateData, { new: true });
};

exports.forgetPassword = async (email) => {
    const user = await userModel.findOne({ email });
    if(!user) throw new Error('User not found');

    const otp = otpUtils.generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await otpModel.findOneAndUpdate(
        { email }, 
        { otp, expiresAt, status: 'sent' }, 
        { upsert: true, new: true }
    );

    await otpUtils.sendOtpEmail(email, otp);
};

exports.validateOtp = async (email, otp) => {
    const otpRecord = await otpModel.findOne({ email, otp, status: 'sent' });
    if (!otpRecord) throw new Error('Invalid or expired OTP');

    // if (new Date() > otpRecord.expiresAt) {
    //     throw new Error('OTP Expired')
    // }

    // await otpModel.updateOne({ email }, { status: 'used' })

    return otpRecord;
};

exports.resetPassword = async (email, otp, newPassword) => {
    const otpRecord = await otpModel.findOne({ email, otp, status: 'sent', expiresAt: { $gt: new Date() } });

    if (!otpRecord) throw new Error('Invalid or expired OTP');

    const hashedPassword = await validations.hashPassword(newPassword);
    await userModel.findOneAndUpdate({ email }, { password: hashedPassword });

    // Now mark OTP as used after successful password reset
    await otpModel.findByIdAndUpdate(otpRecord._id, { status: 'used' });
    return { message: 'Password reset successful' };

    // await exports.validateOtp(email, otp);

    // const hashedPassword = await validations.hashPassword(newPassword);

    // await userModel.findOneAndUpdate({ email }, { password: hashedPassword });

    // return { message: 'Password updated successfully' };
}



// exports.updateUserProfile = async (userId, updateData) => {
//     const user = await userModel.findById(userId)
//     if (!user) {
//         throw new Error('User not found');
//     }
//     return await userModel.findByIdAndUpdate(userId, updateData, { new: true });
// }

// exports.saveProfileImage = async (userId, imagePath) => {
//     const user = await userModel.findById(userId);
//     if(!user) throw new Error('User not found');

//     user.profileImage = imagePath;
//     await user.save();
//     return imagePath;
// }
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
