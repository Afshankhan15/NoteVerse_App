import "./Register.css";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { pink } from "@mui/material/colors";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState(null); // State for the alert message
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Name validation
  const validateName = (name) => {
    const pattern = /^[A-Za-z\s]+$/;
    return pattern.test(name) && name.length >= 5 && name.length <= 24;
  };

  // Email validation
  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const RegisterData = async () => {
    const { name, email, password } = user;

    // if name, email and password exists
    if (name && email && password) {
      if (validateEmail(email) && validateName(name)) {
        if (password.length >= 6 && password.length <= 25) {
          try {
            // axios used to make HTTP POST request to a local server endpoint --> Axios is a promise-based library, so it uses the .then() method to handle responses asynchronously.
            const response = await axios.post(
              "http://localhost:4000/register",
              user
            );

            if (response.data.message === "Successfully Registered") {
              toast.success("Successfully Registered", { theme: "colored" });
              // After Login Successfully it will redirect user to the login page
              setTimeout(() => {
                navigate("/login"); // Redirect to the login page after 2 sec
              }, 2000);
            }
          } catch (error) {
            toast.error("Error: " + error.response.data.message, {
              theme: "colored",
            }); // error : user already registered or any other error
          }
        } else {
          toast.error("Password must be between 6 and 25 characters", {
            theme: "dark",
          });
        }
      } else if (!validateName(name)) {
        toast.error(
          "Name should be a minimum of 5 characters, a maximum of 24 characters, and may only consist of letters and spaces",
          {
            theme: "dark",
          }
        );
      } else {
        toast.error("Email must be in the format 'user@domain.com'", {
          theme: "dark",
        });
      }
    } else {
      if (
        (!name && !email && !password) ||
        (name && !email && !password) ||
        (!name && email && !password) ||
        (!name && !email && password)
      ) {
        setAlertMessage("Please enter your details");
      } else if (!name && password && email) {
        setAlertMessage("Name is required");
      } else if (!validateName(name)) {
        setAlertMessage("Invalid Name");
      } else if (!email && password && name) {
        setAlertMessage("Email is required");
      } else if (!validateEmail(email)) {
        setAlertMessage("Invalid email address");
      } else if (!password && email && name) {
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
      <div className="register-page">
        <div className="register-container">
          <Avatar sx={{ m: -1, bgcolor: pink[500] }}>
            <LockOutlinedIcon />
          </Avatar>
          <p className="register-h1">Register</p>
          <div className="register-input">
            <input
              className="register-inputval"
              type="text"
              name="name"
              value={user.name}
              placeholder="Name *"
              onChange={handleChange}
              required
            />
            <input
              className="register-inputval"
              type="email"
              name="email"
              value={user.email}
              placeholder="Email Address *"
              onChange={handleChange}
              required
            />
            <input
              className="register-inputval"
              type="password"
              name="password"
              value={user.password}
              placeholder="Password *"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-btnflex">
            <button onClick={RegisterData} className="register-btn">
              Sign Up
            </button>
            <Link to={"/login"} style={{ color: "blue" }}>
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
