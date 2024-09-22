import React, { useEffect, useState } from "react";
import "./ProductPopUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { getKey } from "../../features/apiCall";

const ProductPopUp = ({ p_name, p_quantity, price, setOpen }) => {
  const { token } = useSelector((state) => state.auth);

  const [key, setKey] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getKey(dispatch, setKey, token);
  }, []);

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
          <button className="buy_btn">Buy Now</button>
          <button onClick={() => setOpen(false)} className="cancel_btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopUp;
