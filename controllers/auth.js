const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");

// user login
module.exports.login = async function(req, res) {
    try{
        const applicant = await User.findOne({ email:req.body.email });
        // check if user exists
        if (applicant) {
            const passwordResult = bcrypt.compareSync(req.body.password, applicant.password);
            // check password is equial saved in DB
            if (passwordResult) {
                // token valid diring 1 hour
                const token = jwt.sign({
                    email: applicant.email,
                    userId: applicant._id,
                }, keys.jwt, { expiresIn: 60 * 60 });

                res.status(200).json({ token:`Bearer ${token}` });
            } else {
                res.status(401).json({ message:"Wrong password" });
            }
        } else {
            res.status(404).json({ message:"User with such email not found" });
        }
    } catch (error) {
        errorHandler(res, error);
    }

};

// user singup
module.exports.singup = async function(req, res) {
    const applicant = await User.findOne({ email:req.body.email });
    if (applicant) {
        // not unique email
        res.status(409).json({ message:"Email exists!" });
    } else {
        // create new user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        });

        try {
            await user.save();
            res.status(201).json({ message:"User created" });
        } catch (error) {
            errorHandler(res, error);
        }
    }
};
