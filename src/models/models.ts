import mongoose from "mongoose";

export const institutionModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    courseOffered: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    classHours: {
        type: Number,
    },

})