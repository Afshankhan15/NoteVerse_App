import React, { useEffect } from "react";
import "./Note.css";
import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Addnote from "../AddNote/Addnote";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; // npm install jwt-decode

const Note = () => {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState(null); // State for the alert message
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [addlist, setAddlist] = useState([]);

  const [user, setUser] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Since you are dealing with asynchronous operations (such as making an HTTP request using Axios),
  // using async/await can simplify the code and make it more intuitive and handle potential errors more gracefully and make the code easier to read

  // getNotes function ---> FETCH ALL user NOTES till now
  const getNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get(
          "http://localhost:4000/api/v1/getNotes",
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        if (response.data.message === "Token Valid") {
          setAddlist(response.data.UserData); // FETCH ALL NOTES of USER from BACKEND/SERVER
          // alert('GET NOTES');
        } 
      }
    } 
    catch (error) {
      console.error("Error in Getting notes:", error);
      toast.error("Error: " + error.response.data.message, {
        theme: "dark",
      }); // Error in getting note
    }
  };

  // useEffect runs when we navigate means when we Login and redirect to ADD NOTES page
  // navigate function changes (which happens whenever the component re-renders), the effect will be re-run.

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieves the token from the local storage

    if (!token) {
      //  if token is not present,that means user is not authenticated.
      navigate("/login");
    } // If the token is present means --> user authenticated
    else {
      // Decodes the token to extract information about the user --> email, id and iat
      const user = jwtDecode(token);

      if (!user) {
        // Checks if the user object could not be decoded which means the token is invalid or corrupted.
        localStorage.removeItem("token"); // Remove the invalid token
        navigate("/login"); // Redirect to login page due to an invalid token
      } else {
        // If both the token is present and the user object is decoded successfully, it means the user is authenticated and the token is valid --> then getNotes function executed
        getNotes(); // Call the async function to fetch ALL user NOTES
      }
    }
  }, [navigate]); // The dependency array ensures that this useEffect runs whenever the navigate func changes

  // function to ADD Notes
  const addNotes = async () => {
    const { title, description } = user;

    const token = localStorage.getItem("token");

    if (!token) {
      // If token is missing, show the alert message
      toast.error("Please Login to Add Notes", { theme: "colored" });
      // setTimeout is added becuase it redirects to login page without showing message but now it first display msg and then redirect to login page
      setTimeout(() => {
        navigate("/login"); // Redirect to the login page
      }, 2000); // Adjust the delay as needed --> 2 sec

      return; // return back to prevent further execution
    }

    if (!title || !description) {
      if (!title && description) {
        setAlertMessage("Title is required");
      } else if (title && !description) {
        setAlertMessage("Description is required");
      } else {
        setAlertMessage("Both title and description are required");
      }
      // Open the snackbar
      setOpenSnackbar(true);

      // Set a timeout to close the snackbar after 3 seconds
      setTimeout(() => {
        setOpenSnackbar(false);
        setAlertMessage(null);
      }, 3000);

      return; // return back
    }

    if (title.length < 3 || title.length > 25) {
      toast.error("Title must be between 3 and 25 characters", {
        theme: "dark",
      });
      return;
    }

    if (description.length <= 5) {
      toast.error("Description must be greater than 5 character", {
        theme: "dark",
      });
      return;
    }

    // if above conditions satisfies

    try {
      // axios used to make HTTP POST request to a local server endpoint addNotes here
      const response = await axios.post(
        "http://localhost:4000/api/v1/addNotes",
        user,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      // Note added successfully
      if (response.data.message === "Notes Added Successfully") {
        // alert(response.data.message)
        toast.success(response.data.message, { theme: "dark" });
        getNotes(); // FETCH ALL NOTES AGAIN AFTER ADDING NEW NOTE
        setUser({ title: "", description: "" }); // Clear input fields
      } 
    }
    catch (error) {
      toast.error("Error: " + error.response.data.message, {
        theme: "colored",
      }); // Error in Adding note
    }
  };

  const LogOut = () => {
    const token = localStorage.getItem("token");

    // if token does not exist and still user click on logout button then alert message will be displayed on UI and return
    if (!token) {
      toast.error("Please Login First", { theme: "colored" });
      setTimeout(() => {
        navigate("/login"); // Redirect to the login page
      }, 2000);
      return;
    }

    // else --> if token exist and user wants to logout

    localStorage.removeItem("token"); // Remove the token from localStorage
    toast.success("Logged out successfully", { theme: "colored" });
    setTimeout(() => {
      navigate("/login"); // Redirect to the login page
    }, 2000);
    return;
  };

  return (
    <div>
      <Navbar />

      <ToastContainer
        autoClose={2000}
        style={{ marginTop: "120px", marginRight: "-10px" }}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000} // Auto-hide after 2 seconds
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        style={{ marginTop: "110px", marginRight: "-20px" }}
      >
        <Alert variant="filled" severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>

      <div className="note-page">
        {/* to see ALL Notes in browser console */}
        {console.log("ALL NOTES in addlist", addlist)}
        {/* browser console --> {ALL NOTES : Array(18)} ex -> 2: {_id: '64cf531deafbb3c8c706135b', title: 'title 2', description: 'hello Afshan*/}

        <div className="note-container">
          <div className="note-input">
            <input
              className="note-inputval"
              type="text"
              name="title"
              value={user.title}
              placeholder="Title"
              onChange={handleChange}
              required
            />
            <textarea
              className="note-inputval"
              type="text"
              name="description"
              value={user.description}
              onChange={handleChange}
              rows={5}
              placeholder="ADD description..."
              required
            />
          </div>
          <div className="note-btnflex">
            <button onClick={addNotes} className="note-btn">
              Add Notes
            </button>
            {/* this logout button does not exist inside this div*/}
            <button onClick={LogOut} className="note-btn logout-button">
              Log Out
            </button>
          </div>
        </div>
      </div>
      <Addnote addlist={addlist} setAddlist={setAddlist} />
    </div>
  );
};

export default Note;
