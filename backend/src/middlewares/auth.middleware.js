import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

// --------------- Create Token ----------------
const generateToken = (userData) => {
  return jwt.sign(userData, "8f4b6c2a9e1d7f3b5a8c4d2e6f9a7b3c1e5d8f2a4b6c9e3");
};

// ---------------- Verify Token -------------
const jwtAuthMiddleware = asyncErrorHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    // throw {
    //   status: 404,
    //   statusInfo: "fail",
    //   response: "Token not found",
    // };
    throw new ApiError(404, "fail", "Token not found");

    // return res.status(404).json({
    //   status: 404,
    //   statusInfo: "fail",
    //   response: "Token not found",
    // });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    // throw {
    //   status: 401,
    //   statusInfo: "fail",
    //   response: "Unauthorized request",
    // };
    throw new ApiError(401, "fail", "Unauthorized request");
  }
  try {
    const decoded = jwt.verify(token, "8f4b6c2a9e1d7f3b5a8c4d2e6f9a7b3c1e5d8f2a4b6c9e3");
    const user = await User.findById(decoded._id);

    if (!user) {
      //   throw {
      //     status: 401,
      //     statusInfo: "fail",
      //     response: "Invalid Access Token",
      //   };
      throw new ApiError(401, "fail", "Invalid Access Token");
    }

    req.user = decoded;
    next();
  } catch (error) {
    // throw {
    //   status: 401,
    //   statusInfo: "fail",
    //   response: "Invalid Access Token",
    // };
    throw new ApiError(401, "fail", "Invalid Access Token");
  }
});
export { generateToken, jwtAuthMiddleware };
