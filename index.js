const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.port

const mongourl=process.env.mongourl 
const app = express();
app.use(bodyParser.json());

mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mentorRoutes = require("./routes/mentor");
const studentRoutes = require("./routes/student");

app.use("/mentors", mentorRoutes);
app.use("/students", studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}` );
});
