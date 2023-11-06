const express = require("express");
const connect=require('./database/db.js');
const config=require('./config.js');
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

connect();
const app = express();

app.use(bodyParser.json());



app.use("/auth", authRoutes);
app.use("/api", userRoutes);


app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
