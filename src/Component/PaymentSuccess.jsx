import {  useEffect,useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styles from "../styles/PaymentSuccess.module.css";
import { useAuth } from "./Contexts/AuthContext";

export const PaymentSuccess = () => {
    const {paymentDetails,setPaymentDetails}=useContext(StoreContext);
    
    useEffect(()=>{
        const storedPaymentDetails=localStorage.getItem('paymentDetails');
        const parsed=JSON.parse(storedPaymentDetails)
        const {pidx}=parsed;
        getVerified(pidx);
        if(!paymentDetails&&storedPaymentDetails)
        {
            setPaymentDetails(JSON.parse(storedPaymentDetails));
        }
        console.log(paymentDetails);
        
      },[paymentDetails,setPaymentDetails])

      const getVerified=async(pidx)=> { 
          try {
            const token = localStorage.getItem('token');
            const res= await axios.post('http://localhost:5010/api/khaltiVerify', {pidx},{headers:{'Authorization': `Bearer ${token}`}});
            console.log(res);
            if(res&&res.data.status==="Completed"){
              showPaymentSuccessful();
            }else{
             showPaymentTerminated();
             }
         }
      catch(err){
        console.log(err);
      }}
    const navigate=useNavigate();

    const showPaymentTerminated=()=>{
      Swal.fire({
        title: 'Payment Canceled!',
        text: 'Your order has been terminated.',
        icon: 'error',
        confirmButtonText: 'OK',
    })
    }

    const showPaymentSuccessful=()=>{

        Swal.fire({
            title: 'Payment Successful!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
        })
    }
    const handleNavigate=()=>{
        navigate('/');
        window.location.reload(); 
    }

  return (
    <div className={styles.main_container}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <button onClick={handleNavigate} className={styles.go_home_btn}>
        Go back to Home Page
      </button>
    </div>
  );
};