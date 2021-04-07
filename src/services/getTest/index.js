const testRoute = require("express").Router();
const sgMail = require("@sendgrid/mail");
const { eMail } = require("../../utilities/email");

testRoute.route("/:testId").post(async (req, res, next) => {
  try {
    sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);
    const emailContent = eMail(
      req.body.email,
      "developer.reniejr@gmail.com",
      "Strive School Admission Test",
      req.params.testId
    );
    await sgMail.send(emailContent);
    res.send("sent");
  } catch (error) {
    console.log(error);
    next(error);
  }
});
