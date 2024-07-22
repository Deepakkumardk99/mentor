const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");

// Create a mentor
router.post("/", async (req, res) => {
  const mentor = new Mentor(req.body);
  await mentor.save();
  res.send(mentor);
});

// Get all students for a particular mentor
router.get("/:mentorId/students", async (req, res) => {
  const mentor = await Mentor.findById(req.params.mentorId).populate(
    "students"
  );
  res.send(mentor.students);
});

// Assign a student to mentor
router.post("/:mentorId/assign", async (req, res) => {
  const mentor = await Mentor.findById(req.params.mentorId);
  const student = await Student.findById(req.body.studentId);
  if (student.mentor) {
    return res.status(400).send("Student already has a mentor");
  }
  mentor.students.push(student);
  student.mentor = mentor;
  await mentor.save();
  await student.save();
  res.send(mentor);
});

module.exports = router;
