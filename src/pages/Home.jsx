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
  const [p_name, setP_name] = useState("");
  const [p_quantity, setP_quantity] = useState("");
  const [price, setPrice] = useState("");
  const [p_image, setP_image] = useState("");

  const handleClick = (p_name, p_quantity, price, p_image) => {
    setP_name(p_name);
    setP_quantity(p_quantity);
    setPrice(price);
    setP_image(p_image);
    setOpen(true);
  };

  return token ? (
    <>
      <Header />
      <div className="dummy_data">
        <h1>Dummy Products</h1>
        <div className="products">
          {productData.map((product, i) => (
            <div key={i} className="product">
              <img src={product.p_image} alt={product.p_name} />
              <h3>Name: {product.p_name}</h3>
              <div className="details">
                <h3>Price: {product.p_price}</h3>
                <h3>Available Quantity: {product.p_quantity}</h3>
              </div>
              <button
                onClick={() =>
                  handleClick(
                    product.p_name,
                    product.p_quantity,
                    product.p_price,
                    product.p_image
                  )
                }
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
        {open && (
          <ProductPopUp
            p_name={p_name}
            p_quantity={p_quantity}
            price={price}
            p_image={p_image}
            setOpen={setOpen}
          />
        )}
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
