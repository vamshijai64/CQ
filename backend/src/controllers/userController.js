const userService = require('../services/userService')
const userModel=require('../models/userModel')

exports.socialRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userService.registerUser({ username, email, password, loginType: 'social' });
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

exports.socialLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.socialLogin({ email, password });
        res.status(200).json({ message: 'Social login successful', user });
    } catch (error) {

        console.log("error",error);
        
        res.status(500).json({ error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ error: "Invalid user ID" });
            }
        
        const user = await userService.getUserById(userId);
        if(!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        if(!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' })
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { userId, username, gender, fan } = req.body;
        const updateData = {};

        // Check if username is provided and whether it already exists
        if (username) {
            const existingUser = await userModel.findOne({ username: username });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            updateData.username = username;
        }

        if (req.file?.path) updateData.profileImage = req.file.path; // Save new image path

        if(gender) updateData.gender = gender;
        if(fan) updateData.fan = fan

        const updatedUser = await userService.updateUserProfile(userId, updateData);
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // await userService.forgetPassword(email);
        await userService.forgetPassword(email);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.validateOtp = async (req, res) => {
   try {
    const { email, otp } = req.body;
    await userService.validateOtp(email, otp);
    res.status(200).json({ message: 'OTP validated successfully' }); 
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
}

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        await userService.resetPassword(email, otp, newPassword);
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}










// exports.editUserProfile = async (req, res) => {
//     try {
//         const { userId, username } = req.body;
//         const updatedUser = await userService.updateUserProfile(userId, { username });
//         res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.updateProfileImage = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         if(!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }
        
//         // userId = Number(userId); // ✅ Ensure userId is a Number
//         // if (isNaN(userId)) {
//         //     return res.status(400).json({ error: 'Invalid userId' });
//         // }
        
//         const imageUrl = await userService.saveProfileImage(userId, req.file.path)
//         res.status(200).json({message: 'Profile image uploaded successfully', imageUrl})
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

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