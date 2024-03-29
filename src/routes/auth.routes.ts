import { Router } from "express";
import {
  GLogin,
  GRegister,
  login,
  register,
} from "../controller/auth.controller.js";
import { sendResponse } from "../helpers.js";

const router = Router();

router.post("/g-login", GLogin);

router.post("/g-register", GRegister);

router.post("/login", login);

router.post("/register", register);

export default router;
