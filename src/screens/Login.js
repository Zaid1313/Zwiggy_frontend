import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  
  let navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }

    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }

  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <div>
          <h2>LogIn to your Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="mt-3 form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="mt-4 m-3 btn btn-primary">
            LogIn
          </button>
          <Link to="/createuser" className="mt-4 m-3 btn btn-danger">
            Create New Account
          </Link>
        </form>
      </div>
    </>
  )
}
