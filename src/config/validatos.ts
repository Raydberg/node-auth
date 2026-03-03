import mongoose from "mongoose";

export const isMongoId = (id: string) => mongoose.isValidObjectId(id)