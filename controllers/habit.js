const Habit = require("../models/Habit");
const errorHandler = require("../utils/errorHandler");


// list of all user habits
// TODO: remove excessive data or remove method for accessing habbit by id
module.exports.getAll = async function(req, res) {
    try {
        const habits = await Habit.find({
            user: req.user.id,
        });
        res.status(200).json(habits);
    } catch (error) {
        errorHandler(res, error);
    }
};

// create new habit
module.exports.create = async function(req, res) {
    try {
        const habit = await new Habit({
            name: req.body.name,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            recurrent: req.body.recurrent,
            user: req.user.id,
        }).save();
        res.status(201).json(habit);
    } catch (error) {
        errorHandler(res, error);
    }
};

// remove habit from database
module.exports.delete = async function(req, res) {
    try {
        await Habit.remove({ "_id":req.params.id });
        res.status(200).json({ message:"Habit has been deleted" })
    } catch (error) {
        errorHandler(res, error);
    }
};

// update habit data in database
module.exports.update = async function(req, res) {
    try {
        // update habit and retur updated one
        const position = await Habit.findByIdAndUpdate(
            { "_id":req.params.id },
            { $set:req.body },
            { new:true },
        );
        res.status(200).json(position);
    } catch (error) {
        errorHandler(res, error);
    }
};

// return one habit for detailed view(?)
module.exports.getById = async function(req, res) {
    try {
        const habit = await Habit.findOne({ "_id":req.params.id, user:req.user.id });
        res.status(200).json(habit);
    } catch (error) {
        errorHandler(res, error);
    }
};
