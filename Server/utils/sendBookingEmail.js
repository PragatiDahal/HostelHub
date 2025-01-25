const nodemailer = require("nodemailer");
const Booking = require("../models/Booking");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hostelhub2024@gmail.com",
    pass: "bzwg rlic gklp hmla", // Use App Password if 2FA is enabled
  },
  secure: true,
  port: 465,
});

async function sendBookingEmail(bookingId) {
  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    const subject =
      booking.status === "Accepted"
        ? "Booking Accepted"
        : booking.status === "Rejected"
        ? "Booking Rejected"
        : "Booking Confirmation";

    const htmlContent =
      booking.status === "Accepted"
        ? `<p>Your booking has been accepted for ${booking.roomType.join(
            ", "
          )} at ${booking.hostel.name}, ${booking.hostel.location}.</p>`
        : booking.status === "Rejected"
        ? `<p>Unfortunately, your booking has been rejected for ${booking.roomType.join(
            ", "
          )} at ${booking.hostel.name}, ${booking.hostel.location}.</p>`
        : `<p>Thank you for booking with HostelHub! Details for ${booking.roomType.join(
            ", "
          )} at ${booking.hostel.name}, ${booking.hostel.location}:</p>`;

    const mailOptions = {
      from: "hostelhub2024@gmail.com",
      to: booking.userInfo.email,
      subject,
      html: `<h1>${subject}</h1>${htmlContent}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
}

module.exports = sendBookingEmail;
