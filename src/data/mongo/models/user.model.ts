import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true, "Name is required"]
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        unique: true
    },
    emailValidated: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        require: [true, "Password is required"],
    },
    img: {
        type: String,
    },
    role: {
        type: [String],
        default: ["USER"],
        enum: ["ADMIN", "USER"]
    },
})

userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete (ret as any)._id
    },
})

export const UserModel = mongoose.model("User", userSchema)
