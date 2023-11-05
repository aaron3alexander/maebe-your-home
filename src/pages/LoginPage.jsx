import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "../styles.css";
const signLink = "/Signup";

export default function LoginPage({ setAuthenticatedUser }) {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false); //shows message if user information is not correct

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        { email, password },
        { withCredentials: true }
      );
      const data = response.data;

      if (data.user) {
        console.log("Login successful");
        alert(
          "You succefully logged in, you will be redirected to the homescreen"
        ); //alert user that he is logged in
        // Set the user as authenticated in the Header component
        setAuthenticatedUser(data.user);
        // store the user in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ email: data.user.email })
        );
        // Redirect to the homepage after successful login
        navigate("/");
      } else {
        console.error("Login failed, user:", email);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setShowMessage(true);
      // handle login error, e.g., show an error message
    }
  };

  return (
    <div className="container pt-5 mt-5">
      <div className="row justify-content-center align-items-center">
        {showMessage && (
          <div className="alert alert-danger show text-center" role="alert">
            Email and password do not match, One or both are incorrect!
          </div>
        )}
        <form name="login" method="post" className="col-6 border p-3 rounded">
          <h1>Login</h1>
          <br />
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className=""
            onClick={handleLogin}
          >
            Login
          </button>
          <br></br>
          <div>
            Don't have an account?
            <Link to={signLink} className="">
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}