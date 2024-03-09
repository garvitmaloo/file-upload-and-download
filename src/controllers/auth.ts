import type { NextFunction, Request, Response } from "express";
import type {
  User,
  LoginDetails,
  StandardResponse,
  UserDocument
} from "../../types";
import { registerUserService } from "../service/auth";

export const handleRegisterUser = async (
  req: Request<User>,
  res: Response,
  next: NextFunction
): Promise<Response<StandardResponse<UserDocument | null>> | undefined> => {
  const { fullName, email, password } = req.body;

  const response = await registerUserService({ fullName, email, password });

  if (response.error !== null) {
    res.statusCode = response.error.statusCode;
    next(new Error(response.error.message));
    return;
  }

  return res.status(201).json(response);
};

export const handleLogin = (
  req: Request<LoginDetails>,
  res: Response
): void => {
  const loginData = req.body;
  console.log("Login = ", loginData);

  res.send("Logging in");
};
