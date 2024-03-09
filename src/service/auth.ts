import User from "../models/Users";
import type {
  StandardResponse,
  UserDocument,
  User as UserType
} from "../../types";

export const registerUserService = async ({
  fullName,
  email,
  password
}: UserType): Promise<StandardResponse<UserDocument | null>> => {
  try {
    if (
      fullName === undefined ||
      email === undefined ||
      password === undefined
    ) {
      return {
        result: null,
        error: {
          message: "Please provide all the details in order to register.",
          statusCode: 400
        }
      };
    }

    const userRecord = await User.findOne({ email });

    if (userRecord !== null) {
      return {
        error: {
          statusCode: 404,
          message: "User already exists with this email address"
        },
        result: null
      };
    }

    // Input validation logic
    // Password encryption logic
    const newUser = await User.create({ fullName, email, password });

    return {
      error: null,
      result: newUser
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
