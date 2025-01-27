const mongoose = require('mongoose')
const counter = require('../configs/counterIncrement')

const userSchema = mongoose.Schema(
    {
    _id: { type: Number },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, sparse: true }, // Email is optional for mobile login
    password: { type: String }, // Password is optional for mobile login
    phoneNumber: { type: String, unique: true, sparse: true }, // Phone number for mobile login
    loginType: { type: String, enum: ['social', 'mobile'], required: true }, // To differentiate login types
    }, 
    { _id: false }
);

userSchema.pre('save', async function (next) {
    if(this.isNew) {
        const nextId = await counter.getNextSequenceValue('UserIDs');
        this._id = nextId;
    }
    next()
})

module.exports = mongoose.model("User", userSchema);