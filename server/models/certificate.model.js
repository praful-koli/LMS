const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
    issueDate: { type: Date, default: Date.now },
    certificateData: { type: Object, required: true } // Store template data or other relevant info
});

module.exports = mongoose.model('Certificate', certificateSchema);