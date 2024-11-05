import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";


passport.use(new LocalStrategy (async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, {message: "User not found"})

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return done(null, user); 
        else return done (null, false, {message: "Invalid password"})
    } catch (error) {
        return done (error)
    }
}));

passport.serializeUser((user, done) => {
    console.log("We are inside sterilizeUser")
    done(null, user._id)
})

passport.deserializeUser( async (_id, done) => {
    try {
        console.log("We are inside desterizeUser")
        const user = await User.findById(_id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export default passport;