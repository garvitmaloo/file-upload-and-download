import jwt from "jsonwebtoken";

import User from "../models/Users";
import type {
  LoginDetails,
  StandardResponse,
  UserDocument,
  LoggedInUserDocument,
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

export const loginUserService = async (
  loginCreds: LoginDetails
): Promise<StandardResponse<LoggedInUserDocument | null>> => {
  try {
    const { email, password } = loginCreds;

    if (email === undefined || password === undefined) {
      return {
        error: {
          message: "Please enter email and password to log in",
          statusCode: 400
        },
        result: null
      };
    }

    const user = await User.findOne({ email });

    if (user === null) {
      return {
        error: {
          message: "No user found with this email",
          statusCode: 400
        },
        result: null
      };
    }

    const userRecord = user.toObject();

    const passwordMatches = password === userRecord.password;

    if (!passwordMatches) {
      return {
        error: {
          statusCode: 400,
          message: "Incorrect password"
        },
        result: null
      };
    }

    const secureToken = jwt.sign(
      userRecord,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d"
      }
    );

    return {
      error: null,
      result: {
        ...userRecord,
        secureToken
      }
    };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};
