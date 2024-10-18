import { Schema, model, SchemaTypes, SchemaType } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      set: (value) => String(value).toLowerCase(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      set: (value) => String(value).toLowerCase(),
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    leaveTotal: {
      type: Number,
      default: 3,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("leaveRequests", {
  localField: "_id",
  foreignField: "userId",
  ref: "leave_requests",
});

const userModel = model("Users", userSchema);
export default userModel;
