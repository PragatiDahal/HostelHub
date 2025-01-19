const axios = require("axios");
require("dotenv").config();
const Booking = require("../models/Booking");

const khalti = async (req, res) => {
  try {
    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
    const { customer_info } = req.body;
    const formData = {
      return_url: "http://localhost:5173",
      website_url: "http://localhost:5173",
      amount: 100000,
      purchase_order_id: "1234",
      purchase_order_name: "Hostel Booking",
      customer_info: customer_info,
    };
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      formData,
      {
        headers,
      }
    );

    if (response.data) {
      res.json({
        message: "khalti success",
        payment_method: "khalti",
        data: response.data,
      });
    } else {
      res.json({
        message: "khalti unsuccess",
        payment_method: "khalti",
        data: "",
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const paymentVerify = async (req, res) => {
  try {
    const { pidx, username, email } = req.body;
    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers }
    );
    if (response.data.status === "Completed") {
      const bookingDetails = await  Booking.findOne({
        "userInfo.userName": username,
        "userInfo.email": email,
        orderStatus: "pending",
      });
      if (bookingDetails) {
        console.log("true");
      }
      if (bookingDetails !== null) {
        const Id = bookingDetails._id.toString();
        try {
          await  Booking.findOneAndUpdate(
            { _id: Id },
            {
              $set: {
                booked: true,
                PaymentStatus: "paid",
                paymentDetails: response.data,
                paymentMode: "Khalti",
              },
            },
            { new: true }
          );
        } catch (err) {
          console.log("error while updating payment status" + err);
        }
      }
    }
    res.send(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to lookup payment" });
  }
};

module.exports = { khalti, paymentVerify };
