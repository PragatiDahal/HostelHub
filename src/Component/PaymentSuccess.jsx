// import {  useEffect,useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import styles from "../styles/PaymentSuccess.module.css";

// export const PaymentSuccess = () => {
//   const { paymentDetails, setPaymentDetails } = useState();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedPaymentDetails = localStorage.getItem("paymentDetails");

//     if (storedPaymentDetails) {
//       const parsedDetails = JSON.parse(storedPaymentDetails);
//       setPaymentDetails(parsedDetails);
//     }

//     // Show success alert
//     Swal.fire({
//       title: "Your Payment Is Successfully Received 🫰",
//       text: "Order has been placed successfully 📃",
//       icon: "success",
//       confirmButtonText: "OK",
//     });
//   }, [setPaymentDetails]);

//   const handleNavigate = () => {
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <div className={styles.main_container}>
//       <h1>Payment Successful!</h1>
//       <p>Thank you for your purchase. Your order has been placed successfully.</p>
//       <button onClick={handleNavigate} className={styles.go_home_btn}>
//         Go back to Home Page
//       </button>
//     </div>
//   );
// };