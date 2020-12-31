const mongoose = require("mongoose");

const mulfileSchema = new mongoose.Schema({
  file: {
    filePath: String,
    contentType: String,
  },
});
module.exports = new mongoose.model("MulFileSchema", mulfileSchema);
