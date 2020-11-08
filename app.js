const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2({
    clientId: "974034712341-29d0qha3mc24jjtosnktc2uudt1abdon.apps.googleusercontent.com",
    clientSecret: "yZlgMQydhYAnRbKDMc3_nA8E", // Client Secret
    redirectUri: "https://developers.google.com/oauthplayground", // Redirect URL
});
oauth2Client.setCredentials({
    refresh_token: "1//04AHUTIJddzY8CgYIARAAGAQSNwF-L9IrAR-zeG8JI5wipKyg8p4eizUCDRzDTHzUhngqr8Lu4JTQJJhnI79mowUjfuzE6iCgY2o"
});

const fakeEmail = require('fake-email');
const path = require('path');
//const dotenv=require('dotenv');
//dotenv.config();
const app = express();
app.use(express.static(path.join(__dirname, 'coronafront')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));



//let myaccount = nodemailer.createTestAccount();


const mailSender = async() => {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        //host: 'smtp.gmail.com',
        //port:25,
        service: 'gmail',
        // auth: {
        //     user: 'automatedreply192@gmail.com',
        //     pass: 'DonutsAh1@'
        // }
        auth: {
            type: "OAuth2",
            user: "automatedreply192@gmail.com",
            clientId: "974034712341-29d0qha3mc24jjtosnktc2uudt1abdon.apps.googleusercontent.com",
            clientSecret: "yZlgMQydhYAnRbKDMc3_nA8E",
            refreshToken: "1//04AHUTIJddzY8CgYIARAAGAQSNwF-L9IrAR-zeG8JI5wipKyg8p4eizUCDRzDTHzUhngqr8Lu4JTQJJhnI79mowUjfuzE6iCgY2o",
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        },
    });
    return transporter;

}

mailSender()
    .then(transporter => {
        console.log('Transporter created succesfuly');





        //


        const mysqlConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Adil@123',
            database: 'corona'
        });

        mysqlConnection.connect(err => {
            if (err) {
                console.log('It was not successful \n Error:' + JSON.stringify(err, undefined, 2));
            } else {
                console.log('Its a success');
            }
        });

        app.get('/success', (req, res) => {
            res.sendFile(path.join(__dirname + '/coronafront/success.html'));
        });

        app.post('/survey/addForm', (req, res) => {
            saveRequstData(req);
            res.redirect('/success');
        });

        function saveRequstData(req) {
            mysqlConnection.query("INSERT INTO survery SET ?", req.body, (err, rows) => {
                if (!err) {
                    const {
                        questiontwo,
                        questionthree,
                        questionfour,
                        questionfive,
                        employee_id,


                    } = req.body;
                    let email = fakeEmail('Automated Email: noreply.milfordct.gov');

                    //console.log(questiontwo);
                    if (questiontwo == 'yes' || questionthree == 'yes' || questionfour == 'yes' || questionfive == 'yes') {
                        let message = 'Employee id number ' + employee_id + ' ' + ' has answred yes to the following questions ';

                        if (questiontwo == 'yes') {
                            message += ' 3. Do you have a household member who has tested positive with COVID-19 within the last 14 days? ' + questiontwo + ', ';
                        }
                        if (questionthree == 'yes') {
                            message += ' 4. Do you have a household member who has had symtoms of COVID-19 in the last 14 days? ' + questionthree + ', ';
                        }
                        if (questionfour == 'yes') {
                            message += ' 5. Have you been in close contact (within 6 feet for longer than 15 minutes) with someone who tested positive for COVID-19 or who had symtoms ' + questionfour + ', ';
                        }
                        if (questionfive == 'yes') {
                            message += ' 6. Have you traveled to any of the following states in the last 14 days? ' + questionfive + ', ';
                        }
                        //console.log("FakeEmail===>", email);
                        sendEmail(email, message);
                    } else {
                        console.log('No answer was a YES');
                    }

                }
            });
        }

        function sendEmail(email, message) {
            //console.log("Now sending email");

            const mailOptions = {
                from: `noreply.${email}`,
                //replyTo: `noreply.${email}`,
                to: "aheller@milfordct.gov",
                subject: "Test email",
                text: message

            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log("ERROR FROM NODEMAILER", error)
                } else {
                    console.log("Email has been sent  " + info.response);
                }
            });
        }
        /*
        app.listen(3000, () => {
            console.log("The app is listening ");
        });
        */

    })
    .catch(err => {
        console.log('Error while creating the transporter', err);
    });

module.exports = app;