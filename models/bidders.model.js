const mongoose = require("mongoose");

const bidder = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
    sparse: true,
  },
  bidValue: { type: Number },
});

const model = mongoose.model("bidder", bidder);

module.exports = model;
