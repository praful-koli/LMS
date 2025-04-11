const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

// Replace with your actual Razorpay Key ID and Secret
const RAZORPAY_KEY_ID = 'your_key_id';
const RAZORPAY_KEY_SECRET = 'your_secret';
const WEBHOOK_ID = 'your_webhook_id'; // You'll find this on Razorpay Dashboard

// Step 1: Start ngrok and get the public URL
exec('ngrok http 8080 --log=stdout > ngrok.log &', (err) => {
  if (err) {
    console.error('Failed to start ngrok:', err);
    return;
  }
});

// Step 2: Wait and read ngrok log to get the public URL
setTimeout(() => {
  fs.readFile('ngrok.log', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading ngrok log:', err);
      return;
    }

    const match = data.match(/https:\/\/[a-z0-9\-]+\.ngrok-free\.app/);
    if (match) {
      const publicUrl = match[0];
      console.log('Ngrok URL:', publicUrl);

      // Step 3: Update Razorpay webhook URL
      axios.put(
        `https://api.razorpay.com/v1/webhooks/${WEBHOOK_ID}`,
        { url: `${publicUrl}/api/v1/purchase/webhook` },
        {
          auth: {
            username: RAZORPAY_KEY_ID,
            password: RAZORPAY_KEY_SECRET,
          },
        }
      )
      .then(() => console.log('✅ Razorpay webhook updated!'))
      .catch((error) => {
        console.error('❌ Failed to update Razorpay webhook:', error.response?.data || error.message);
      });
    } else {
      console.error('❌ Could not find ngrok URL in log');
    }
  });
}, 4000); // Wait for ngrok to start (you can increase the timeout if needed)
