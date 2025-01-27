const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    otp: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    status: { type: String, enum: ['sent', 'used'], default: 'sent' },
});

module.exports = mongoose.model('Otp', otpSchema);