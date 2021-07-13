const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connected to MongoDB");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
