"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
app.use(require("./src/middlewares/logger"));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
//Mail Service & NodeMail:
// const nodemailer = require("nodemailer");

//Create Fake Account
// nodemailer.createTestAccount()
//     .then((email)=> console.log(email))

/* {
  user: 'tfmcythdawkd3g6b@ethereal.email',
  pass: 'bAyqkDN61tG3pa1zTH',
  smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },          //mail göndermekle ilgili ayar
  imap: { host: 'imap.ethereal.email', port: 993, secure: true },           //mail almakla ilgili ayarlardan biri       <---  oluşturulan fake hesap
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },           //mail almakla ilgili ayarlardan biri
  web: 'https://ethereal.email'
}*/

//Connection Mail Server
// const transporter = nodemailer.createTransport({                         //mail servisine erişme komutu denilebilir

//   host: "smtp.ethereal.email",
//   port: "587",
//   secure: false, // ssl || tls
//   auth: {
//     user: "tfmcythdawkd3g6b@ethereal.email",
//     pass: "bAyqkDN61tG3pa1zTH",
//   },
// });

//SendingMail
// transporter.sendMail(
//   {
//     from: "tfmcythdawkd3g6b@ethereal.email",
//     to: "avekremyilmazturk@gmail.com",
//     subject: "Hello",
//     text: "HelloOOOooo",
//     html: "<b> HelloOOOooo </b>",
//   },
//   (error, successInfo) => {
//     error ? console.log(error) : console.log(successInfo);
//   }
// );

/* ----- */
// YandexMail (yandex):
// const mailSettings = {
//     service: 'Yandex',
//     user: 'username@yandex.com',
//     pass: 'password' // your emailPassword
// }
/* ----- */

//GoogleMail Model:
// const mailSettings = {
//     service: 'Gmail', 
//     user: 'avekremyilmazturk@gmail.com',
//     pass: 'glgo kjsk zxmn uqav'                                                 //---> google üzerinden aldığım şifre burda
// }

//İçerik tarafı
// const emailContent = {
//     from: mailSettings.user,
//     to: 'avekremyilmazturk@gmail.com',
//     subject: "Hello",
//     html: "<b> HelloOOOooo </b>",
// }

//Bağlantı tarafı
// const transporter = nodemailer.createTransport({
//     service: mailSettings.service, 
//     auth: {                                                                     //---> Gmail bağlantı ayarları
//         user: mailSettings.user,
//         pass: mailSettings.pass,
//     },
// })

//Gönderme tarafı
//  transporter.sendMail(emailContent, (error, info) => {
//     error ? console.log(error) : console.log(info)
// })


/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to RENT A CAR API",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// Routes:
app.use(require("./src/routes"));

/* ------------------------------------------------------- */
/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));


/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
