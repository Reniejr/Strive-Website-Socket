const RoomModel = require("../services/rooms/model");

const saveMessage = async (messageContent, roomName, socketId) => {
  try {
    // console.log(messageContent);
    const findRoom = await RoomModel.findOne({
      roomName: roomName,
      "membersList.socketId": socketId,
    });
    //FIND MEMBER
    const member = await findRoom.membersList.find(
      (user) => user.socketId === socketId
    );

    //CHECK ANSWERS
    let answers;
    let check = member.userAnswerList.filter(
      (answer) => answer.question === messageContent.question
    );
    let answerIndex = member.userAnswerList.findIndex(
      (answer) => answer.question === messageContent.question
    );
    if (check.length > 0) {
      answerIndex === 0
        ? (answers = [
            messageContent,
            ...member.userAnswerList.slice(answerIndex + 1),
          ])
        : (answers = [
            ...member.userAnswerList.slice(0, answerIndex),
            messageContent,
            ...member.userAnswerList.slice(answerIndex + 1),
          ]);
    } else {
      answers = member.userAnswerList.concat(messageContent);
    }
    // console.log(answers);

    //UPDATE SCORE
    let trueScore = member.userAnswerList.filter(
      (answer) => answer.isCorrect === true
    );
    // console.log(trueScore);

    const updateAnswer = await RoomModel.findOneAndUpdate(
      { roomName: roomName, "membersList.socketId": socketId },
      {
        "membersList.$.userAnswerList": answers,
        "membersList.$.totalScore": trueScore.length,
      }
    );
    const newScore = await updateScore(roomName, socketId);
    // return updateAnswer;
    return newScore.quests;
  } catch (error) {
    console.log(error);
  }
};

const updateScore = async (roomName, socketId) => {
  const findRoom = await RoomModel.findOne({
    roomName: roomName,
    "membersList.socketId": socketId,
  });
  let questions = findRoom.quests.map((q, qI) => {
    return { question: qI, answers: [] };
  });
  questions.map((quest, questI) => {
    findRoom.membersList.map((member, memberI) => {
      if (member.userAnswerList[questI]) {
        quest.answers = [
          ...quest.answers,
          member.userAnswerList[questI].answer,
        ];
      } else {
        quest.answers = [...quest.answers, "none"];
      }
    });
  });
  // console.log(questions);
  let answerList = findRoom.quests.map((q, qI) => {
    let findQuest = questions.find((quest, questI) => quest.question === qI);
    // console.log(findQuest);
    q.answers.map((answer, answerI) => {
      let answerScore = findQuest.answers.filter((ans, ansI) => ans === answerI)
        .length;
      answer.score = answerScore;
    });
    return q;
  });

  const updateScore = await RoomModel.findOneAndUpdate(
    { roomName: roomName, "membersList.socketId": socketId },
    {
      quests: answerList,
    }
  );
  return updateScore;
};

module.exports = { saveMessage, updateScore };
