const mongoose = require("mongoose");

const Item = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    startPrice: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    bidders: [
      {
        user: {
          type: String,
        },
        bidValue: { type: Number },
      },
    ],
  },
  {
    collection: "item-data",
  }
);

const model = mongoose.model("ItemData", Item);

module.exports = model;
