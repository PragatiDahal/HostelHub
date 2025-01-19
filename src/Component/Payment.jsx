import styles from "../styles/Payment.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState();
  const location = useLocation();
  const { state } = location;
  console.log(state);
  const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/khalti", {
        customer_info: {
          name: `${state?.firstName + " " + state?.lastName}`,
          email: `${state?.email}`,
        },
      });
      const paymentUrl = await response.data.data.payment_url;
      setPaymentDetails(response.data.data);
      localStorage.setItem(
        "paymentDetails",
        JSON.stringify(response.data.data)
      );
      window.location.href = paymentUrl;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.payment_container}>
      <div className={styles.payment_wrapper}>
        <h2 className={styles.subheading}>Pay through khalti</h2>
        <div className={styles.payment_options}>
          <div className={`${styles.option} `}>
            <img
              src="/images/khalti.png"
              alt="Khalti"
              className={styles.payment_logo}
              onClick={handlePayment}
            />
            <p>Pay with Khalti</p>
          </div>
        </div>
      </div>
    </div>
  );
};
