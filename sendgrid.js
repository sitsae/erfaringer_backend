const express = require("express");
const sgMail = require("@sendgrid/mail");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.listen(3000, () => console.log("Server is running on port 3000"));

app.post("/send-email", (req, res) => {
  console.log(req.query);
  const { subject, text, html } = req.query;

  console.log({ subject, text, html });

  const msg = {
    to: "sigurd.saether@gmail.com",
    from: "torve_s@live.no",
    subject: subject || "No subject",
    text: text || "No message",
    html: html || "<strong>No message</strong>",
  };

  console.log(msg);

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).send("Email sent");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error sending email");
    });
});
