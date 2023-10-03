import React from "react";
import "./Addnote.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addnote = ({ addlist, setAddlist }) => {

  const deletecards = async (id) => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    try {
    const response = await axios
      .post(
        "http://localhost:4000/api/v1/deleteNotes",
        { id },
        {
          headers: {
            "x-access-token": token, // Include the token in the request headers
          },
        }
      )
      if(response.data.message === 'Note Deleted successfully') {
        setAddlist(response.data.UserData.ALLnotes); // Update the addlist with the remaining notes after deletion
        // alert(res.data.message);
        toast.success(response.data.message, { theme: "dark" });
      }
    }
      catch (error) {
        toast.error("Error: " + error.response.data.message, {
          theme: "dark",
        }); // Error in deleting note
      }
  };

  return (
    <div className="pageadded row">
      {addlist.map((element) => (
        <div className="card col-md-3" key={element._id}>
          {/* pass element._id to deletecards function to delete unique id added cards */}
          <div className="addcard-container">
            <div className="title-size">
              <h1 className={element.title.length > 14 ? "h1-small" : "h1-big"}>
                {element.title}
              </h1>
            </div>

            <div className="deleteicon">
              <i
                class="fa fa-trash"
                aria-hidden="true"
                onClick={() => deletecards(element._id)}
              >
                {" "}
              </i>
            </div>
          </div>

          <textarea className="notebox" value={element.description} readOnly />
        </div>
      ))}
    </div>
  );
};
export default Addnote;
// example 1 in addlist
// description
// :
// "amazing subject"
// title
// :
// "Maths "
// userId
// :
// "64ec3cef78e1efe8e97649c8"
// __v
// :
// 0
// _id
// :
// "64ed99ed4cc5520721338a34"
