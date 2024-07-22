const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Mentor = require("../models/Mentor");

// Create a student
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

// Assign or Change Mentor for a particular student
router.post("/:studentId/assign-mentor", async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  const mentor = await Mentor.findById(req.body.mentorId);
  if (student.mentor) {
    const previousMentor = await Mentor.findById(student.mentor);
    previousMentor.students.pull(student._id);
    await previousMentor.save();
  }
  student.mentor = mentor;
  mentor.students.push(student);
  await student.save();
  await mentor.save();
  res.send(student);
});

// Show previously assigned mentor for a particular student
router.get("/:studentId/previous-mentor", async (req, res) => {
  const student = await Student.findById(req.params.studentId).populate(
    "mentor"
  );
  res.send(student.mentor);
});

module.exports = router;
