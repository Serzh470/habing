const bcrypt = require("bcryptjs");
const User = require("../models/User");


// user login
module.exports.login = function(req, res) {
    res.status(200).json({
        email: req.body.email,
        password: req.body.password,
    });
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
        } catch (e) {
            res.status(500).json({ message:"Error during user creation in database" });
        }
    }
};
