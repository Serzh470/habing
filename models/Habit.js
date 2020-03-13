const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
    },
    recurrent: {
        type: String,
        required: true,
    },
    user: {
        ref: "users",
        type: Schema.Types.ObjectId,
    }
});

module.exports = mongoose.model("habbits", habitSchema);
