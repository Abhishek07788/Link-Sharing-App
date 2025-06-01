const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const UserRouter = require("./Routes/user.routes");
const platformsRouter = require("./Routes/platforms.routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", UserRouter);
app.use("/platforms", platformsRouter);

app.use("/", (req, res) => {
  res.send("Hii, this is the Share Link Platform backend");
});

app.listen(process.env.PORT || 8080, async () => {
  await dbConnect();
  console.log("Stared at http://localhost:8080");
});
