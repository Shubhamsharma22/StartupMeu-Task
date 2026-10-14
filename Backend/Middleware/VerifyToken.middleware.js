import jwt from "jsonwebtoken";
import AsyncHandler from "../Utils/AsyncHandler.Utils.js";
import ApiError from "../Utils/ApiError.Uitls.js";

const VerifyToken = AsyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "No token provided");
  }

  const token = authHeader.split(" ")[1];
  let verified;

  try {
    verified = jwt.verify(token, process.env.JWT_Secret);
  } catch {
    throw new ApiError(401, "Token not valid");
  }

  req.user = verified;
  next();
});

export default VerifyToken
