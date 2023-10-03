const usermodel = require("../Models/User"); // import usermodel from Models

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // npm install jsonwebtoken

const dotenv = require("dotenv"); // Import dotenv for environment variables

dotenv.config({ path: "../Config/config.env" });

//import Error.js from Utils
const handleErrorResponse = require("../Utils/Error");

// import Success.js from Utils
const handleSuccessResponse = require("../Utils/Success");

const secret_key = process.env.JWT_SECRET; // Use environment variable for secret

exports.Register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const Existinguser = await usermodel.findOne({ email });
    if (Existinguser) {
      // status(400) indicates a client error, often due to bad req
      return handleErrorResponse(res, 400, "User already registered", null);
    } else {
      const NewUser = await usermodel.create({ name, email, password });
      return handleSuccessResponse(
        res,
        201,
        "Successfully Registered",
        NewUser
      ); // send newuser to client just to test
    }
  } catch (error) {
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

exports.Login = async (req, res) => {
  // console.log(req.body); // to see user req to server in terminal
  const { email, password } = req.body;

  try {
    const Existinguser = await usermodel.findOne({ email });
    if (Existinguser) {
      // if email exists in DB

      // ---->>>> BCRYPT <<<------- then compare password
      const Matchtpswd = await bcrypt.compare(password, Existinguser.password);

      if (Matchtpswd) {
        // JWT [step-1] -->server create token  ---> token is created using User email, user id and secret key and sends to user
        // [when you decode JWT it will give you same email, same id and iat]
        const token = jwt.sign(
          {
            email: Existinguser.email,
            id: Existinguser._id,
          },
          secret_key
        );

        // when User Login--> Server creates and sends Token to USER/Client [step -1 JWT]

        const obj = {
          LoginUser: Existinguser,
          userToken: token,
        };

        return handleSuccessResponse(res, 200, "Login Successfully", obj);
      } else {
        // res.send({ message: "Password didn't match" });
        return handleErrorResponse(res, 401, "Password didn't match", null); // 401 -> Unauthorized credentials from user side
      }
    } else {
      return handleErrorResponse(res, 400, "User not registered", null);
    }
  } catch (error) {
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};
