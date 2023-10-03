import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { Avatar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { orange } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState(null); // State for the alert message
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Email validation
  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const LoginData = async () => {
    const { email, password } = user;

    if (email && password) { // if email and password both exists
      if (validateEmail(email)) {
        if (password.length >= 6 && password.length <= 25) {

          try {
          // axios used to make HTTP POST request to a local server endpoint login here
          const response = await axios.post("http://localhost:4000/login", user)
            // step2 --> JWT
            if (response.data.UserData.userToken) {
              // when user received token from SERVER
              localStorage.setItem("token", response.data.UserData.userToken); // store token on user local storage
              // toast.success("User Login Successfully", { theme: "colored" });
              toast.success(`${response.data.UserData.LoginUser.name} Login Successfully`, { theme: "colored" });
              setTimeout(() => {
                navigate("/note"); // Redirect to the note page after 2 sec
              }, 2000);
            } 
          }
          catch (error) {
              toast.error("Error: " + error.response.data.message, {
                theme: "colored",
              }); // error : user already registered or any other error
            }

        } else {
          toast.error("Password must be between 6 and 25 characters", {
            theme: "dark",
          });
        }
      } else {
        toast.error("Email must be in the format 'user@domain.com", {
          theme: "dark",
        });
      }
    } else {
      if (!email && !password) {
        setAlertMessage("Please enter your details");
      } else if (!email && password) {
        setAlertMessage("Email is required");
      } else if (!validateEmail(email)) {
        setAlertMessage("Invalid email address");
      } else if (!password && email) {
        setAlertMessage("Password is required");
      }
      // Open the snackbar
      setOpenSnackbar(true);

      // Set a timeout to close the snackbar after 3 seconds
      setTimeout(() => {
        setOpenSnackbar(false);
        setAlertMessage(null);
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />
     
      <ToastContainer
        autoClose={2000}
        style={{ marginTop: "70px", marginRight: "-10px" }}
      />{" "}

      {/* Add this line */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000} // Auto-hide after 2 seconds
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        style={{ marginTop: "70px", marginRight: "-20px" }}
      >
        <Alert variant="filled" severity="error">
          {alertMessage}
        </Alert>
      
      </Snackbar>
      
      <div className="page">
        <div className="container">
          
          <Avatar sx={{ m: -1, bgcolor: orange[700] }}>
            <LockOutlinedIcon />
          </Avatar>
          
          <p className="h1">LOGIN</p>
          <div className="input">
            <input
              className="inputval"
              type="email"
              name="email"
              value={user.email}
              placeholder="Email Address *"
              onChange={handleChange}
              required
            />
            <input
              className="inputval"
              type="password"
              name="password"
              value={user.password}
              placeholder="Password *"
              onChange={handleChange}
              required
            />
          </div>
          <div className="btnflex">
            <button onClick={LoginData} className="btn">
              Login
            </button>
            <Link to={"/register"} style={{ color: "blue" }}>
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
