const { Schema, model } = require('mongoose');

const leaveSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    typeOfLeave: {
        type: String,
        enum: ['casual', 'sick', 'annual', 'unpaid', 'half'],
        required: true
    },
    reason: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = model('Leave', leaveSchema);
