/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { handleLogin, handleRegisterUser } from "../controllers/auth";

const router = Router();

router.post("/register", handleRegisterUser);
router.post("/login", handleLogin);

export default router;
