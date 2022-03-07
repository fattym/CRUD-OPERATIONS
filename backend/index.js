const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("DB Connected");
});

app.use(cors());

app.use(express.json());

app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
