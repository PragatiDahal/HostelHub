const express = require('express');
const nodemailer = require('nodemailer');
const mongoose =require('mangoose')

const app = express();
app.use(express.json());

app.post('/api/bookings', async (req, res) => {
  const { location, bedroom, laundry, pricing } = req.body;

  // Normally you'd save the booking info in the database here

  try {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password',  // Replace with your email password or app-specific password
      },
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: '"Hostel Hub" <your-email@gmail.com>', // sender address
      to: 'user-email@gmail.com', // user's email
      subject: 'Hostel Booking Confirmation', // Subject line
      text: `Your booking for the hostel has been confirmed. Details: Location: ${location}, Bedroom: ${bedroom}, Laundry: ${laundry}, Pricing: ${pricing}`, // plain text body
      html: `<b>Your booking for the hostel has been confirmed.</b><br>Details:<br>Location: ${location}<br>Bedroom: ${bedroom}<br>Laundry: ${laundry}<br>Pricing: ${pricing}`, // HTML body
    });

    res.status(200).json({ message: 'Booking confirmed and email sent.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error processing booking.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
