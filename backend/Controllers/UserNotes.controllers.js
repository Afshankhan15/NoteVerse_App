const usernotes = require("../Models/UserNotes"); // import userNotes Model

//import Error.js from Utils
const handleErrorResponse = require("../Utils/Error");

// import Success.js from Utils
const handleSuccessResponse = require("../Utils/Success");

// API ---> TO ADD NOTES
exports.AddNotes = async (req, res) => {
  console.log(req.body);
  const { title, description } = req.body;

  console.log("REQ ID : ", req.user.id); // [USER ID:"6519109c4ea41b676320a336"] ---> REQ ID :  6519109c4ea41b676320a336

  console.log("REQ USER", req.user); // here decoded ==== req.user [same thing]
  // [decoded] REQ USER {
  //   email: 'rough@123gmail.com',
  //   id: '6519109c4ea41b676320a336',
  //   iat: 1696228674
  // }
  console.log("REQ ", req); // full info about req

  // const userId = decoded.id // but i assign req.user = decoded so that's why

  // The authenticateJWT middleware will verify the token and attach decoded user information to req.user
  const userId = req.user.id; // Use the user ID from the decoded token attached by the middleware

  console.log(userId); // 6519109c4ea41b676320a336

  // demo
  //   "allNotes": {
  //     "title": "hello world",
  //     "description": "hello how are you guys",
  //     "userId": "6519109c4ea41b676320a336",
  //     "_id": "651a6bd38c5b6d869da9c018", // unique id for every card notes
  //     "__v": 0
  // }

  try {
    const allNotes = await usernotes.create({ title, description, userId });
    // res.status(201).send({ message: "Notes Added Successfully", UserNotes: allNotes }); // server send all notes to user
    return handleSuccessResponse(
      res,
      201,
      "Notes Added Successfully",
      allNotes
    );
  } catch (error) {
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

// API ---> TO FETCH NOTES
exports.Getnotes = async (req, res) => {
  // The authenticateJWT middleware will verify the token and attach decoded user information to req.user
  const userId = req.user.id;

  try {
    const allUserNotes = await usernotes.find({ userId });

    if (!allUserNotes) {
      return handleErrorResponse(
        res,
        404,
        "Token is invalid. Please log in again",
        null
      );
    }

    // res.status(200).send({ message: "Token Valid", ALLnotes: allUserNotes });
    return handleSuccessResponse(res, 200, "Token Valid", allUserNotes);
  } catch (error) {
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

// API ---> TO DELETE NOTES
exports.DeleteNotes = async (req, res) => {
  const { id } = req.body; // receive id from req.body/CLIENT
  // The authenticateJWT middleware will verify the token and attach decoded user information to req.user
  const userId = req.user.id;

  try {
    const deleteNotes = await usernotes.findByIdAndDelete(id); // Delete the note by _id

    if (!deleteNotes) {
      return handleErrorResponse(
        res,
        404,
        "Note not found or you don't have permission to delete it",
        null
      );
    }

    const AllUserNotes = await usernotes.find({ userId }); // Fetch ALL notes belonging to the userID

    // res
    //   .status(200)
    //   .send({
    //     message: "Note Deleted successfully",
    //     ALLnotes: AllUserNotes,
    //     DeletedNote: deleteNotes,
    //   });

    const obj = {
      ALLnotes: AllUserNotes,
      DeletedNote: deleteNotes,
    };

    return handleSuccessResponse(res, 200, "Note Deleted successfully", obj);
  } catch (error) {
    console.log("error in server", error);
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};
