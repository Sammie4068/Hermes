const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { adminRoute, authRoute, usersRoute} = require("./routes/index");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", cors(), adminRoute);
app.use("/api/v1", cors(), authRoute);
app.use("/api/v1", cors(), usersRoute);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "e don dey work!!!" });
});

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

app.listen(port, () => {
  console.log("server don dey run...")
});
