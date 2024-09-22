import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosUtils";
import { toast } from "react-hot-toast";
import "../components/styles/Login.scss";
import PulseLoader from "react-spinners/PulseLoader";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [visible, setVisible] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/forgot-password", {
        email,
      });
      if (data.success) {
        setLoading(false);
        setVisible(1);
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const submitCodeHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/validate-code", {
        code,
        email,
      });
      if (data.success) {
        setLoading(false);
        setVisible(2);
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const submitResetHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/reset-password", {
        email,
        password,
        confirmPassword,
      });
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <>
      <Header />
      <div className="login-div">
        {visible === 0 && (
          <div className="login">
            <form className="loginform" onSubmit={submitHandler}>
              <h2 className="forgot_head">Forgot Password</h2>
              <p className="para">
                Enter your email here if you have your account with this email
                then you receive a code in your entered mail id.
              </p>
              <input
                type="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="forgot_btn">
                <button onClick={() => navigate("/login")}>Cancel</button>
                {loading ? (
                  <button disabled={loading} className="load" type="submit">
                    <PulseLoader color="#fff" size={5} />
                  </button>
                ) : (
                  <button type="submit">Send Code</button>
                )}
              </div>
            </form>
          </div>
        )}
        {visible === 1 && (
          <div className="login">
            <form className="loginform">
              <h2 className="forgot_head">Code Validation</h2>
              <p className="para">
                Validation Code has been send successfully. Now enter the code
                below.
              </p>

              <input
                type="text"
                placeholder="123456"
                required
                maxLength="6"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <div className="forgot_btn">
                <button onClick={() => setVisible(1)}>Go Back</button>
                {loading ? (
                  <button disabled={loading} className="load" type="submit">
                    <PulseLoader color="#fff" size={5} />
                  </button>
                ) : (
                  <button type="submit" onClick={submitCodeHandler}>
                    Validate Code
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
        {visible === 2 && (
          <div className="login">
            <form className="loginform">
              <h2 className="forgot_head">Reset Your Password</h2>
              <p className="para">Code validated now reset your password.</p>
              <input
                className="input_forgot"
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="forgot_btn">
                <button onClick={() => navigate("/login")}>Cancel</button>
                {loading ? (
                  <button disabled={loading} className="load" type="submit">
                    <PulseLoader color="#fff" size={5} />
                  </button>
                ) : (
                  <button type="submit" onClick={submitResetHandler}>
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
