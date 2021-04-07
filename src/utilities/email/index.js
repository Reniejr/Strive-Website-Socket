const sgMail = require("@sendgrid/mail"),
  { layerBottom, layerTop } = require("./emailContents");

const eMail = (receiver, sender, subject, id) => {
  const emailContent = {
    to: receiver,
    from: sender,
    subject: subject,
    templateId: "d-22fc8a4e3a044422b9870713e2e9d801",
    dynamic_template_data: {
      subject: subject,
      name: "Welcome to Strive School",
      text: `Hello From Welcome to Strive School,
      As you asked for joining us in a new journey of coding this is the test you have to take in order to start this journey 
        http://localhost/benchmark/exam/${id}`,
    },
  };
  return emailContent;
};

const welcomeMsg = (pwd) => {
  return `
  Hello and Welcome to Strive School,
  Please sign-in to our official website to monitor your achievements and todo lists during our course.
  Here we provide you a temporarily password, please change it after the sign-in:
  ${pwd}
  `;
};

const rejectMsg = () => {
  return `Hello from Strive School,
  We are sorry, but you did not reach the require points in the Admission Test.
  `;
};

module.exports = { eMail, welcomeMsg, rejectMsg };
