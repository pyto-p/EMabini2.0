const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;