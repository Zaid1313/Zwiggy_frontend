import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Cart from "../screens/Cart";
import Model from "../Model";
import { useCart } from "./ContextReducer";

export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  
  const handleLogout = ()=>{
    localStorage.removeItem("authToken")
    navigate('/login')
  }


  return (
    <div id="navdiv">
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            style={{ fontWeight: "550", fontSize: "2rem" }}
            to="/"
          >
            Zwiggy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  style={{ fontWeight: "500" }}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? 
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    style={{ fontWeight: "500" }}
                    aria-current="page"
                    to="/myOrder"
                  >
                    My-Orders
                  </Link>
                </li>
               :""
              }
            </ul>
            {!localStorage.getItem("authToken") ? 
              <div className="d-flex">
                <Link
                  className="btn bg-white text-dark mx-1 "
                  style={{ fontWeight: "600", fontSize: "17px" }}
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn bg-white text-dark mx-1"
                  style={{ fontWeight: "600", fontSize: "17px" }}
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
              : <div>
                <div
                  className="btn bg-white text-dark mx-1"
                  style={{ fontWeight: "600", fontSize: "17px" }}
                  onClick={()=>{setCartView(true)}}>
                  My Cart {' '}
                  <Badge pill bg="danger" className="">{data.length}</Badge>
                </div>
                {cartView? <Model onClose={()=>setCartView(false)}><Cart/></Model>:null}
                <div
                  className="btn bg-white mx-2 me-3"
                  id="logout"
                  style={{ fontWeight: "600", fontSize: "17px" }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
