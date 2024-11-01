import { Router } from "express";
import passport from "passport";

const router = Router();

// Registration Route
router.post("/register", register)

// Login Route
router.post("/login", login)

// Auth Status Route
router.get("/status", authStatus)

// Logout Route
router.post("/logout", logout)

// 2FA Route
router.post("/2fa/setup", setup2fa)

// 2FA Verify Route
router.post("/2fa/verify", verify2fa)

// 2FA reset Route
router.post("/2fa/reset", reset2fa)

export default router;
