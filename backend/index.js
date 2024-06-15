const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const StudentModel = require('./models/Student');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:2fpl5GcDy0HO6enm@e-mabiniv2.qipzye8.mongodb.net/accounts?retryWrites=true&w=majority&appName=e-mabiniv2");

app.post("/signup", (req, res) => {
  StudentModel.create(req.body)
  .then(students => res.json(students))
  .catch(err => res.json(err));
})

app.post("/login", (req, res) => {
  const { studentNumber, birthDate, password } = req.body;
  StudentModel.findOne({ studentNumber })
  .then(student => {
    if (student) {
      // Normalize both dates to the same format (YYYY-MM-DD)
      const inputBirthDate = new Date(birthDate).toISOString().split('T')[0];
      const storedBirthDate = new Date(student.birthDate).toISOString().split('T')[0];

      if (inputBirthDate === storedBirthDate && student.password === password) {
        res.json("Success");
      } else if (inputBirthDate !== storedBirthDate) {
        res.json("Incorrect birth date");
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("Student not found");
    }
  })
  .catch(err => res.json(err));
})

app.listen(3001, () => console.log('Server started on port 3001'));
