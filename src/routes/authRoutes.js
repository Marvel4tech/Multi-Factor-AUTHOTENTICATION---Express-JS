import { Router } from "express";
import { register, login, authStatus, logout, setup2fa, verify2fa, reset2fa } from "../controllers/authControllers.js";
import passport from "passport";

const router = Router();

// Registration Route
router.post("/register", register)

// Login Route
router.post("/login", passport.authenticate("local"), login)

// Auth Status Route
router.get("/status", authStatus)

// Logout Route
router.post("/logout", logout)

// 2FA Route
router.post("/2fa/setup", 
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ message: "unAuthorized" });
    }, setup2fa
)

// 2FA Verify Route
router.post("/2fa/verify", 
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ message: "unAuthorized" });
    }, verify2fa
)

// 2FA reset Route
router.post("/2fa/reset", 
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ message: "unAuthorized" });
    }, reset2fa
)

export default router;
