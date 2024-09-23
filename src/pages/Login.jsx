import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../components/styles/Login.scss";
import PulseLoader from "react-spinners/PulseLoader";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";
import { setToken } from "../features/authSlice";
import Header from "../components/Header/Header";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const captachaRef = useRef();

  const loginHandler = async (e) => {
    if(!value) return toast.error("Please Click on Captcha first");
    e.preventDefault();
    captachaRef.current.reset();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/login", {
        email,
        password,
        value,
      });

      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("id", data.user._id);

        dispatch(
          setToken({
            token: data.token,
            email: data.user.email,
            name: data.user.name,
            id: data.user._id,
          })
        );
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const responseGoogle = async (response) => {
    if(!value) return toast.error("Please Click on Captcha first");
    try {
      if (response["code"]) {
        const { data } = await axiosInstance.get(
          `/api/user/google-login?google_code=${response["code"]}`
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("avatar", data.user.avatar.url);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("id", data.user._id);

          dispatch(
            setToken({
              token: data.token,
              email: data.user.email,
              name: data.user.name,
              avatar: data.user.avatar.url,
              id: data.user._id,
            })
          );
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const onChangeFun = (value) => {
    setValue(value);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: `auth-code`,
  });

  return token ? (
    <Navigate to="/" />
  ) : (
    <>
      <Header />
      <div className="login-div">
        <form className="loginform" onSubmit={loginHandler}>
          <h2>Login</h2>
          <p className="head">Welcome Back! Please enter your details.</p>
          <p className="email">Email</p>
          <input
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="email">Password</p>
          <input
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div to="/register" className="signup">
            <Link to="/register">Create an account?</Link>
            <Link to="/reset-password">Forgot Password?</Link>
          </div>

          <div className="recaptcha">
            <ReCAPTCHA
              sitekey={`${process.env.REACT_APP_SITE_KEY}`}
              onChange={onChangeFun}
              ref={captachaRef}
            />
          </div>

          <button disabled={loading} type="submit">
            {loading ? <PulseLoader color="#fff" size={5} /> : "SIGNIN"}
          </button>
          <button className="google" onClick={googleLogin}>
            <FcGoogle /> Login with Google
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
