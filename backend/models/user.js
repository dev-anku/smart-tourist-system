const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: Number, required: true, unique: true, min: 0 },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["Tourist", "Responder", "Admin"],
    default: "Tourist",
    required: true,
  },
  password: { type: String, required: true },
  idHash: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
