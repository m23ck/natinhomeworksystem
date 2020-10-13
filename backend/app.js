require("dotenv").config();
var cors = require('cors')
const express = require("express");
const morgan = require("morgan");
var bodyParser = require('body-parser')

const app = express();
const gebruikerRouter = require("./server/routes/gebruiker.route");
const typeRouter = require("./server/routes/type.route");
const klasRouter = require("./server/routes/klas.route");
const vakRouter = require("./server/routes/vak.route");
const richtingRouter = require("./server/routes/richting.route");
const roadmapRouter = require("./server/routes/roadmap.route");
const assignmentRouter = require("./server/routes/assignment.route");
const resultaatRouter = require("./server/routes/resultaat.route");
const klas_roadmapsRouter = require("./server/routes/klas_roadmaps.route");
const student_klasRouter = require("./server/routes/student_klas.route");
const assignment_submissionRouter = require("./server/routes/assignment_submission.route");

//Remove when in production
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());



app.use("/gebruiker", gebruikerRouter);
app.use("/type", typeRouter);
app.use("/klas", klasRouter);
app.use("/vak", vakRouter);
app.use("/richting", richtingRouter);
app.use("/roadmap", roadmapRouter);
app.use("/assignment", assignmentRouter);
app.use("/resultaat", resultaatRouter);
app.use("/klas_roadmap_association", klas_roadmapsRouter);
app.use("/student_klas_association", student_klasRouter);
app.use("/assignment_submission", assignment_submissionRouter);



app.listen(process.env.APP_PORT, () => {
    console.log("Server running on port", process.env.APP_PORT);
})


// When route does not exist, show the requester this message
app.get('*', (req, res) => {
    res.json({
        message: "Welkom bij de Backend van N.H.S."
    });
});
