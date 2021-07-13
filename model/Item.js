const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  owner: {
    type: String,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
