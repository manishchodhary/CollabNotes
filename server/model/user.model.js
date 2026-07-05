import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    username: { type: String, require: true, unique: true, trim: true },
    email: { type: String, require: true, lowercase: true },
    password: { type: String, require: true },
  },
  { timestamps: true },
);

const userModel = new model ("User", userSchema);
export default  userModel