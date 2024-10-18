import mongoose, { SchemaTypes } from "mongoose";

const leaveRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    type: {
      type: SchemaTypes.String,
      enum: ["annual", "sick", "casual", "unpaid", "half"],
      required: true,
    },
    status: {
      type: SchemaTypes.String,
      default: "pending",
    },
    reason: {
      type: SchemaTypes.String,
      required: true,
    },
    startDate: {
      type: SchemaTypes.Date,
      required: true,
    },
    endDate: {
      type: SchemaTypes.Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

leaveRequestSchema.virtual("user", {
  localField: "userId",
  foreignField: "_id",
  ref: "Users",
  justOne: true,
});

export const LeaveModel = mongoose.model("leave_requests", leaveRequestSchema);

export default LeaveModel;
