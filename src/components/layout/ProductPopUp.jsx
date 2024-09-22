import React, { useEffect, useState } from "react";
import "./ProductPopUp.scss";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosUtils";
import toast from "react-hot-toast";
import { server } from "../../features/store";

const ProductPopUp = ({ p_name, p_quantity, price, p_image, setOpen }) => {
  const { token } = useSelector((state) => state.auth);

  const [key, setKey] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleBuy = async () => {
    const { data } = await axiosInstance.get(`/api/order/get-key`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const { key } = data;

    const { data: orderData } = await axiosInstance.post(
      `/api/order/create-order`,
      {
        name: p_name,
        quantity: 1,
        price: price,
        img_url: p_image,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setKey(key);
      setOrderId(orderData.orderId);
    }

    try {
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (orderId) {
      const openPopUp = () => {
        const options = {
          key,
          amount: price * 100,
          currency: "INR",
          name: "MutaEngine",
          description: "Razorpay Subscription - MutaEngine",
          image: p_image,
          order_id: orderId,
          callback_url: `${server}/verify-payment`,
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          theme: {
            color: "#F37254",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };

      openPopUp();
    }
  }, [orderId]);

  return (
    <div className="popup">
      <div className="popup-content">
        <h1>Buy Product: {p_name}</h1>
        <div className="p_details">
          <h3>Price: {price}</h3>
          <h3>Available Quantity: {p_quantity}</h3>
        </div>
        <div className="buy_details">
          <span>Quantity to buy: 1</span>
          <button onClick={handleBuy} className="buy_btn">Buy Now</button>
          <button onClick={() => setOpen(false)} className="cancel_btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopUp;
