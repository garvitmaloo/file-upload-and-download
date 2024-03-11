import type { Document } from "mongoose";

export interface StandardResponse<T> {
  error: null | { statusCode: number; message: string };
  result: null | T;
}

export interface User {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}

export type UserDocument = User & Document;

export interface LoggedInUserDocument {
  fullName: string;
  email: string;
  password: string;
  secureToken: string;
}
