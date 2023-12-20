import React, { memo, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useNavigate, Link } from "react-router-dom";

import { registerValidate } from "../helpers/validate.js";
import { convertToBase64 } from "../helpers/convert.js";
import { register } from "../helpers/request.js";
import "./style.css";


function Register() {
  const imageRef = useRef();
  const navigate = useNavigate();
  const imageHandler = (event) => {
    convertToBase64(event.target.files[0])
    .then(base64Image => {
      imageRef.current.src = base64Image;
      formik.setFieldValue("image", base64Image);
    })
    .catch(() => {
      toast.error("Failed to load image!")
    })
  }
  const formik = useFormik({
    initialValues: {
      image: "",
      username: "",
      phone: "",
      type: "buyer",
      password: "",
      cpassword: ""
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let responsePromise = register(values);
      toast.promise(responsePromise,{
        loading: "Registering...",
        success: (res) => {
          navigate("/login");
          return res.data.msg;
        },
        error: (res) => res.response.data.msg
      })
    }
  });
  return (
    <div className="register form-container">
      <Toaster position="top-center" />
      <h3>Register</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="avatar-container">
          <img src="/avatar.png" alt="avatar" ref={imageRef} />
          <label htmlFor="avatar">
            <span>
              <img src="/edit-icon.png" className="editicon" alt="edit icon" /> 
            </span>
          </label>
        </div>
        <input onChange={imageHandler} type="file" name="avatar" id="avatar" accept="image/*" /><br />

        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input {...formik.getFieldProps("username")} type="text" name="username" class="form-control" id="username" placeholder="username" /><br />
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text" id="phone">Phone</span>
            <input {...formik.getFieldProps("phone")} type="tel" name="phone" class="form-control" id="phone" placeholder="phone" /><br />
        </div>

        <div class="input-group mb-3">
            <label class="input-group-text" for="type">You are</label>
            <select onChange={(event) => formik.setFieldValue("type", event.target.value)} name="type" class="form-select" id="type" placeholder="type" >
                <option value="buyer">buyer</option>
                <option value="seller">seller</option>
            </select><br />
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input {...formik.getFieldProps("password")} type="password" name="password" class="form-control" id="password" placeholder="password" /><br />
        </div>

        <div class="mb-3">
            <label for="cpassword" class="form-label">Confirm Password</label>
            <input {...formik.getFieldProps("cpassword")} type="password" name="cpassword" class="form-control" id="cpassword" placeholder="confirm password" /><br />
        </div>

        <input type="submit" class="btn btn-outline-success" id="button "value="register" />
        <p>Already have an account? <Link to={"/login"}>login</Link></p>
      </form>
    </div>
  )
}

export default memo(Register);