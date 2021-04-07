const roomRoute = require("express").Router();
const RoomModel = require("./model");
const exam = require("../../utilities/q&A.json");

//CREATE EXAM
const createExam = () => {
  const question = 10;
  let givenExam = [];
  let masterExam = [...exam];
  for (let i = 0; i < question; i++) {
    const random = Math.floor(Math.random() * masterExam.length);
    let quest = {
      ...masterExam[random],
    };
    quest.answers = quest.answers.map((answer) => {
      return {
        ...answer,
        score: 0,
      };
    });
    givenExam.push(quest);
    masterExam.splice(random, 1);
  }
  return givenExam;
};

//METHODS
//POST
roomRoute.route("/").post(async (req, res, next) => {
  try {
    let quests = createExam();
    let body = { ...req.body, quests };
    const newRoom = await new RoomModel(body),
      { _id } = await newRoom.save();
    res.send(newRoom);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET
roomRoute.route("/").get(async (req, res, next) => {
  try {
    const exams = await RoomModel.find();
    res.send(exams);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET BY ID
roomRoute.route("/:examId").get(async (req, res, next) => {
  try {
    const exam = await RoomModel.findById(req.params.examId);
    res.send(exam);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//EXPORT
module.exports = roomRoute;
