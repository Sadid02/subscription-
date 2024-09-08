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

        fetch('7459570693:AAHeQkEBCRJk-HOI8QLqDakGkkskl7O27tw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: '1724753293',
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
