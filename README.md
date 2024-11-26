WhatsApp Web API Integration with Node.js and MySQL

This project demonstrates how to integrate the whatsapp-web.js library with Node.js, Express, and MySQL to build a WhatsApp message automation system. It allows users to send messages programmatically and manage sessions dynamically.
Features

    Dynamic WhatsApp Session Management: Automatically manages multiple sessions using the LocalAuth strategy.
    Send Messages:
        Send messages to specific phone numbers via the API.
        Fetch and send messages stored in a MySQL database.
        Manual message submission through a simple HTML form.
    Database Integration: Fetch messages from a MySQL database and send them to predefined contacts.
    Express API Endpoints:
        /start/:phone_number: Initialize a WhatsApp session for a given phone number.
        /send-message/:message/:mobile: Send a message to a specified number.
        /send-database: Send all messages stored in the database.
        /manual-message/: Manually submit a message using a form.

Installation

    Clone the repository:

git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

Install dependencies:

npm install

Set up a MySQL database:

    Use the following credentials in the code or modify them as needed:
        Host: 127.0.0.1
        User: root
        Password: 12345678zZ!@#$
        Database: whatsapp
    Create a messages table to store messages.

Start the server:

    node app.js

    Access the API at http://localhost:3000.

Example Usage

    Start a WhatsApp session for a phone number:

GET http://localhost:3000/start/1234567890

Send a message to a number:

GET http://localhost:3000/send-message/HelloWorld/1234567890

Send messages from the database:

GET http://localhost:3000/send-database

Use the manual message form:

    GET http://localhost:3000/manual

Requirements

    Node.js and npm
    MySQL database
    Google Chrome or Chromium browser (used by whatsapp-web.js)

Note

    Make sure the .wwebjs_auth folder exists for session management.
    Replace "989178326452@c.us" with the desired recipient's WhatsApp ID.

Acknowledgements

This project utilizes the whatsapp-web.js library for WhatsApp integration.
