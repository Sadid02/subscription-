document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscriptionForm');
    const modal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close-btn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const packageOption = document.getElementById('package').value;
        const paymentOption = document.getElementById('payment').value;
        const transactionId = document.getElementById('transactionId').value;
        const imageFile = document.getElementById('image').files[0];

        if (!name || !email || !packageOption || !paymentOption || !transactionId || !imageFile) {
            alert('Please fill out all fields and upload an image.');
            return;
        }

        const message = `
            New Subscription Request:
            Name: ${name}
            Email: ${email}
            Package Option: ${packageOption}
            Payment Option: ${paymentOption}
            Transaction ID: ${transactionId}
        `;

        console.log('Sending message:', message); // Log the message being sent

        fetch('https://api.telegram.org/bot<Your_Bot_Token>/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: '<Your_Chat_ID>',
                text: message
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        }).then(data => {
            console.log('Response data:', data); // Log the response from Telegram
            if (data.ok) {
                modal.style.display = 'block';

                // Handle modal close
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                });

                window.addEventListener('click', function(event) {
                    if (event.target == modal) {
                        modal.style.display = 'none';
                    }
                });

                form.reset();
            } else {
                alert('Failed to send data to Telegram bot.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Error sending data to Telegram bot.');
        });
    });
});
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
    const { name, email, packageOption, paymentOption, transactionId } = req.body;
    const message = `
        New Subscription Request:
        Name: ${name}
        Email: ${email}
        Package Option: ${packageOption}
        Payment Option: ${paymentOption}
        Transaction ID: ${transactionId}
    `;

    try {
        const response = await axios.post(`https://api.telegram.org/bot<Your_Bot_Token>/sendMessage`, {
            chat_id: '<Your_Chat_ID>',
            text: message
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error sending message');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
