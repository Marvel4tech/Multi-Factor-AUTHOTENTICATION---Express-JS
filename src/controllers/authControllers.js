import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import speakeasy from "speakeasy"
import qrCode from "qrcode"
import jwt from "jsonwebtoken"

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

export const setup2fa = async (req, res) => {
    try {
        console.log("The rq.user is : ", req.user)
        const user = req.user
        const secret = speakeasy.generateSecret()
        console.log("The secret object is", secret)
        user.twoFactorSecret = secret.base32
        user.isMfaActive = true
        await user.save()
        const url = speakeasy.otpauthURL({
            secret: secret.base32,
            label: `${req.user.username}`,
            issuer: "www.marvel4tech.com",
            encoding: "base32",
        })
        const qrImageUrl = await qrCode.toDataURL(url)
        res.status(200).json({
            message: "2FA setup successful",
            qrImageUrl,
            secret: secret.base32,
        })
    } catch (error) {
        res.status(500).json({ error: "Error setting 2FA", message: error })
    }
}

export const verify2fa = async (req, res) => {
    const { token } = req.body
    const user = req.user

    const verified = speakeasy.totp({
        secret: user.twoFactorSecret,
        encoding: "base32",
        token,
    });

    if(verified) {
        const jwtToken = jwt.sign(
            {username: user.username}, 
            process.env.JWT_SECRET,
            {expiresIn: "1hr"}
        )  
        res.status(200).json({ message: "2FA is successful", token: jwtToken })    
    } else {
        res.status(400).json({ message: "invalid 2FA token" })
    }
}

export const reset2fa = async (req, res) => {
    try {
        const user = req.user
        user.twoFactorSecret = ""
        user.isMfaActive = false
        await user.save()
        res.status(200).json({ message: "2FA reset successful" })
    } catch (error) {
        res.status(500).json({ error: "Error reseting 2FA", message: error })
    }
}