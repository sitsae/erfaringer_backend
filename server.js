const express = require("express");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(express.json());

app.post("/send-email", (req, res) => {
  const { from, subject, text, html } = req.body;

  if (!from || !subject || !text || !html) {
    return res.status(400).send("Missing required fields");
  }

  const autoResponse = `<!DOCTYPE html>
<html lang="no">
  <head>
    <title>Bekreftelse på mottatt e-post</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="css/style.css" rel="stylesheet" />
  </head>
  <body>
    <div style="text-align: center; padding: 20px">
      <!-- Placeholder for logo -->
      <a href="https://www.erfaringeras.no"
        ><img
          alt="Logo"
          style="width: 300px; height: auto"
          src="https://erfaringeras.no/assets/logo-E-Q0FyGV.png"
      /></a>
      <h1>Takk for din e-post!</h1>
      <p>
        Vi har mottatt din e-post og vil ta kontakt med deg så snart som mulig.
      </p>
      <p>
        Hvis du har ytterligere spørsmål, vennligst
        <a href="mailto:post@erfaringeras.no">kontakt oss via e-post</a> eller
        besøk vår <a href="https://www.erfaringeras.no">nettside</a>.
      </p>
      <p>Med vennlig hilsen,<br /><strong>Erfaringer AS</strong></p>
    </div>
  </body>
</html>
`;

  const msg = {
    to: from,
    from: "torve_s@live.no",
    subject: subject,
    text: text,
    html: autoResponse,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).send("Email sent");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error sending email");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
