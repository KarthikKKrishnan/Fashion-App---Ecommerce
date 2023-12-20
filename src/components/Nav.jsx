import React, { useContext } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

import { GlobalContext } from '../context';
import "./nav.css";

function Nav() {
  let { getGlobal: {isLoggedin, image}, setGlobal } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logoutHandler = () => {
    setGlobal({
      isLoggedin: false,
      username: null,
      type: null,
      phone: null,
      image: null,
      email: null
    });
    localStorage.removeItem("token");
    toast.success("Logged out!");
    navigate("/");
  }
  return (
    <div className='nav-container'>
        <Toaster position="top-center" />
        <img src="/logo.png" alt="logo" onClick={() => navigate("/")} />

        <div className="pages">
            <div onClick={() => navigate('/Home')}>HOME</div>
        </div>

        <div className="pages">
            <div onClick={() => navigate('/men')}>MEN</div>
        </div>

        <div className="pages">
            <div onClick={() => navigate('/women')}>WOMEN</div>
        </div>

        <div className="pages">
            <div onClick={() => navigate('/kids')}>KIDS</div>
        </div>

        <div className="pages">
            <div onClick={() => navigate('/accessories')}>ACCESSORIES</div>
        </div>

        <div className="search-bar">
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>

      {isLoggedin ? <div className="right profile">
          <img src={image} alt="profile" onClick={() => navigate("/profile")} />
          <button onClick={logoutHandler}class="btn btn-outline-success">Logout</button>
          </div> : <div className="right buttons">

          <div onClick={() => navigate('/women')}>Wishlist</div>
          <div onClick={() => navigate('/women')}>Cart</div>

          {pathname != "/register" && <button onClick={() => navigate("/register")} class="btn btn-outline-success">Register</button>}
          {pathname != "/login" && <button onClick={() => navigate("/login")} class="btn btn-outline-success">Login</button>}
      </div>}
    </div>
  )
}

export default Nav;