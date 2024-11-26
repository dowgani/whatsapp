const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;



app.get('/start/:phone_number', (req, res) => {

const phone_number = req.params.phone_number;

app.use(bodyParser.urlencoded({ extended: true }));
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'pass',
    database: 'whatsapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });



const path = '.wwebjs_auth/';
const session = 'session-client-'+phone_number;
const client_session = 'client-'+phone_number;
// Check if the folder exists
if (fs.existsSync(path + session)) {
    // console.log(`Folder '${session}' exists.`);
    // Continue with the rest of your code
    const client = new Client({
        puppeteer: {
            args: ['--no-sandbox'],
        },
        authStrategy: new LocalAuth({ clientId: client_session }),
    });

    console.log('folder exists!' + client_session);

    client.on('ready', () => {
        console.log('Client is ready!');
        client.sendMessage("989178326452@c.us", 'Client is ready!!!!');
        res.send('Client is ready!');
    });

    client.initialize();



app.get('/send-message/:message/:mobile', (req, res) => {
        
        const currentDate = new Date();

        // const message = req.params.message;
        const message = decodeURIComponent(req.params.message);
        const mobile = req.params.mobile;
        // client.sendMessage("989178326452@c.us", message );
        client.sendMessage(mobile+"@c.us", message );
        // client.sendMessage("989178326452@c.us", message + ' in this time: ' + currentDate);
        // client.sendMessage(mobile+"@c.us", message);
        res.send('Message sent!');
});




app.get('/send-database', (req, res) => {

    pool.query('SELECT * FROM messages', (error, results) => {
        if (error) {
          console.error('Error fetching data from MySQL:', error);
        } else {
            for (const result of results) {
                // Assuming your field name is 'your_field_name'
                const msg = result.message;
                console.log(msg);
                client.sendMessage("989178326452@c.us", msg );
            }
            res.send('Message read from database and sent!');
        }
      });
});

app.post('/manual-message/', (req, res) => {
    const msg = req.body.message;
    client.sendMessage("989178326452@c.us", msg );
    res.send('Message sent!');
});


app.get('/manual', (req, res) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <h1>Please type a message</h1>
        <form action="/manual-message/" method="post">
            <textarea name="message" maxlength="50"></textarea>
            <br>
            <input type="submit" value="Send Message">
        </form>
    </body>
    </html>
    `;

    res.send(htmlContent);
});


} else {
    console.error(`Folder '${client_session}' does not exist.`);
}




})






app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
