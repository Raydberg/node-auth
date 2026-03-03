import mongoose, { Schema } from "mongoose";


const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true, "Name is required"],
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    },
    user: {
        //Tipado hacia el ID de mongo
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
})

categorySchema.set("toJSON", {
    versionKey: false,
    virtuals: true,
    transform: function (doc, ret, options) {
        delete (ret as any)._id
    },
})


export const CategoryModel = mongoose.model("Category", categorySchema)
