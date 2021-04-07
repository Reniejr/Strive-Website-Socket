const { Schema, model, SchemaType } = require("mongoose");

const RoomModel = new Schema(
  {
    course: { type: String },
    batch: { type: String },
    roomName: { type: String, required: true, unique: true },
    roomType: { type: String },
    time: { type: String },
    batchId: { type: Schema.Types.ObjectId },
    status: {
      type: String,
      default: "Not Completed",
      enum: ["Completed", "Not Completed"],
    },
    quests: [],
    membersList: [
      {
        username: { type: String },
        socketId: { type: String },
        userAnswerList: [
          {
            question: { type: Number },
            answer: { type: Number },
            isCorrect: { type: Boolean },
          },
        ],
        totalScore: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("ChatRoom", RoomModel);
