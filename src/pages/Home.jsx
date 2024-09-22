import React, { useState } from "react";
import Header from "../components/Header/Header";
import "../components/styles/Home.scss";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { productData } from "../utils/dummyData";
import ProductPopUp from "../components/layout/ProductPopUp";

const Home = () => {
  const { token } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  return token ? (
    <>
      <Header />
      <div className="dummy_data">
        <h1>Dummy Products</h1>
        <div className="products">
          {productData.map((product) => (
            <div className="product">
              <img src={product.p_image} alt={product.p_name} />
              <h3>Name: {product.p_name}</h3>
              <div className="details">
                <h3>Price: {product.p_price}</h3>
                <h3>Available Quantity{product.p_quantity}</h3>
              </div>
              <button onClick={() => setOpen(true)}>Buy Now</button>
            </div>
          ))}
        </div>
        {open && <ProductPopUp />}
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
