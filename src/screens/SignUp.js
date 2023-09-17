import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <div>
          <h2>
            Create a new Account
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-3 form-group">
            <label htmlFor="Username">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
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
          <div className="mt-3 form-group">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              type="address"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Address"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="mt-4 m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="mt-4 m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
