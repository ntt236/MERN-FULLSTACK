import { capturePayment } from "@/store/shop/order-slice";
import { data } from "autoprefixer";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  // useEffect(() => {
  //   return () => {
  //     if (paymentId && payerId) {
  //       const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
  //       dispatch(capturePayment({ paymentId, payerId, orderId })).then(
  //         (data) => {
  //           if (data?.payload?.success) {
  //             sessionStorage.removeItem("currentOrderId");
  //             window.location.href = "/shop/payment-success";
  //           }
  //         }
  //       );
  //     }
  //   };
  // }, [payerId, paymentId, dispatch]);

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success"; // Chuyển hướng tới trang thành công
        }
      });
    }
  }, [payerId, paymentId, dispatch]);

  return <div></div>;
};

export default PaypalReturnPage;
