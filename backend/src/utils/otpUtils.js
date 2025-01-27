// const twilio = require('twilio')
// require('dotenv').config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

// const client = twilio(accountSid, authToken);

// exports.sendOtp = async (phoneNumber, otp) => {
//     try {
//         // Format the phone number with country code (e.g., +1 for the US, +44 for UK)
//         const formattedPhoneNumber = `+91 ${phoneNumber}`;
        
//         await client.messages.create({
//             body: `Your OTP code is ${otp}`,
//             from: twilioPhoneNumber,
//             to: formattedPhoneNumber
//         });
//         console.log('OTP sent successfully');
//     } catch (error) {
//         console.error('Error sending OTP: ', error.message);
//         throw new Error('Failed to send OTP');
//     }
// }

// exports.generateOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
// };
