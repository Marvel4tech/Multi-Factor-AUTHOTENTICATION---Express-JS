import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            isMfaActive: false,
        });
        console.log("New user : ", newUser)
        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ error: "Error registering user", message: error })
    }
}

export const login = async (req, res) => {
    console.log("The authenticated user is : ", req.user)
    res.status(200).json({
        message: "User logged in successfully",
        username: req.user.username,
        isMfaActive: req.user.isMfaActive
    })
}

export const authStatus = async (req, res) => {
    if (req.user) {
        res.status(200).json({
            message: "User logged in successfully",
            username: req.user.username,
            isMfaActive: req.user.isMfaActive
        })
    } else {
        res.status(401).json({ message: "Unauthorize user" })
    }
}

export const logout = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorize user" })
    }
    req.logout((err) => {
        if (err) return res.status(400).json({ message: "User not logged in" })
        res.status(200).json({ message: "Logout successful" })
    })
}

export const setup2fa = async (req, res) => {}

export const verify2fa = async (req, res) => {}

export const reset2fa = async (req, res) => {}