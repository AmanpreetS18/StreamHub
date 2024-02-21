// Signin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import Inputform from '../Input/Inputform';
import style from "./signin.module.css";
import { BiSolidCameraMovie } from "react-icons/bi";
export default function Signin() {
  const [value, setValue] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmission = () => {
    if (!value.email || !value.password) {
      setErrMsg("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then(() => {
        setIsLoading(false);
        navigate("/movieapp"); // Redirect to appropriate page
      })
      .catch(error => {
        setIsLoading(false);
        setErrMsg(error.message); // Display error message to user
      });
  };

  return (
    <div className={style.container}>
      <div className={style.innerBox}>
        <h1><BiSolidCameraMovie color="black" size={30}/> Sign-In to StreamHub</h1>
        <Inputform label="Email: " type="email" placeholder="Enter Your Email"
          onChange={(e) => setValue((prev) => ({ ...prev, email: e.target.value }))} />
        <Inputform label="Password: " type="password" placeholder="Enter Your Password"
          onChange={(e) => setValue((prev) => ({ ...prev, password: e.target.value }))} />
        <div className={style.footer}>
          <b>{errMsg}</b>
          <button className={style.btn} onClick={handleSubmission} disabled={isLoading}>
            {isLoading ? "Signing In..." : "SignIn"}
          </button>
          <div className={style.linkContainer}>
            <p>Don't have an account?</p>
            <span><Link to="/signup">SignUp</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}
