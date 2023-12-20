import React, { memo, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { loginValidate } from "../helpers/validate";
import { login } from "../helpers/request";
import { GlobalContext } from "../context";
import "./style.css";

function Login() {
    const {setGlobal} = useContext(GlobalContext);
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validate: loginValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            let loginPromise = login(values);
            toast.promise(loginPromise, {
                loading: "Logging in...",
                success: (res) => {
                    setGlobal({
                        username: values.username,
                        type: res.data.type,
                        isLoggrdin: true
                    })
                    localStorage.setItem("token", res.data.token);
                    res.data.type == "seller" ? navigate("/profile") : navigate("/");
                    return res.data.msg;
                },
                error: (error) => error.response.data.msg
            })
        }
    });
    return (
        <div className="form-container">
            <Toaster position="top-center" />
            <h3>Login</h3>

            <form onSubmit={formik.handleSubmit}>
                 <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input {...formik.getFieldProps("username")} type="text" name="username" class="form-control" id="username" placeholder="username" /><br />
                </div>

                <div class="mb-3">
                     <label for="password" class="form-label">Password</label>
                     <input {...formik.getFieldProps("password")} type="password" name="password" class="form-control" id="password" placeholder="password" /><br />
                </div>

                <input type="submit" class="btn btn-outline-success" id="button "value="Login" />
                <p>Don't have an account? <Link to={"/register"}>register</Link></p>
            </form>
        </div>
    )
}

export default memo(Login);