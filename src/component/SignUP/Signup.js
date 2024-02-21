// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Inputform from '../Input/Inputform';
import style from "./signup.module.css";
import { BiSolidCameraMovie } from "react-icons/bi";
export default function Signup() {
  const [value, setValue] = useState({ name: "", email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmission = () => {
    if (!value.name || !value.email || !value.password) {
      setErrMsg("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, value.email, value.password)
      .then((response) => {
        const user = response.user;
        updateProfile(user, { displayName: value.name })
          .then(() => {
            setIsLoading(false);
            navigate("/");
          })
          .catch((error) => {
            setIsLoading(false);
            setErrMsg(error.message); // Display error message to user
          });
      })
      .catch((error) => {
        setIsLoading(false);
        setErrMsg(error.message); // Display error message to user
      });
  };

  return (
    <div className={style.container}>
      <div className={style.innerBox}>
        <h1><BiSolidCameraMovie/> SignUp to StreamHub</h1>
        <Inputform label="Name: " type="text" placeholder="Enter Your Name"
          onChange={(e) => setValue((prev) => ({ ...prev, name: e.target.value }))} />
        <Inputform label="Email: " type="email" placeholder="Enter Your Email"
          onChange={(e) => setValue((prev) => ({ ...prev, email: e.target.value }))} />
        <Inputform label="Password: " type="password" placeholder="Enter Your Password"
          onChange={(e) => setValue((prev) => ({ ...prev, password: e.target.value }))} />
        <div className={style.footer}>
          <b>{errMsg}</b>
          <button className={style.btn} onClick={handleSubmission} disabled={isLoading}>
            {isLoading ? "Signing Up..." : "SignUp"}
          </button>
          <div className={style.linkContainer}>
            <p>Already have an account?</p>
            <span><Link to="/signin">Signin</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}
