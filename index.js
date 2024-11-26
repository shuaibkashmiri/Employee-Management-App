const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const path = require("path");

require("dotenv").config();
const cors = require("cors");
const EmployeeRoutes = require("./Routes/EmployeeRoutes");
const PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "./client/build")));
require("./Models/db");
app.use(cors());
app.use(bodyParser.json());

app.use("/api/employees", EmployeeRoutes);
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
