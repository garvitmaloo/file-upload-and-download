import type { NextFunction, Request, Response } from "express";
import type {
  User,
  LoginDetails,
  StandardResponse,
  UserDocument
} from "../../types";
import { loginUserService, registerUserService } from "../service/auth";

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

export const handleLogin = async (
  req: Request<LoginDetails>,
  res: Response,
  next: NextFunction
): Promise<Response<StandardResponse<UserDocument>> | undefined> => {
  const loginData: LoginDetails = req.body;

  const response = await loginUserService(loginData);

  if (response.error !== null) {
    res.statusCode = response.error.statusCode;
    next(new Error(response.error.message));
    return;
  }

  const { result } = response;
  const token = result?.secureToken;

  res.cookie("token", token);

  return res.status(200).json({
    error: null,
    result: {
      fullName: result?.fullName,
      email: result?.email
    }
  });
};
