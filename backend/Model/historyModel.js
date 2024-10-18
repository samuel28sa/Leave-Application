import { Schema, model } from "mongoose";

const leaveHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    leaveTitle: {
      type: String,
      required: true,
    },
    entitled: {
      type: Number,
      required: true,
    },
    taken: {
      type: Number,
      required: true,
      default: 0,
    },
    balance: {
      type: Number,
      required: true,
      default: function () {
        return this.entitled - this.taken;
      },
    },
  },
  {
    timestamps: true,
  }
);

leaveHistorySchema.pre("save", function (next) {
  this.balance = this.entitled - this.taken;
  next();
});

const leaveHistoryModel = model("LeaveHistory", leaveHistorySchema);

export default leaveHistoryModel;
