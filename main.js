// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
// const PORT = process.env.PORT || 5001;
const PORT = 3500;

//database connection
mongoose.connect(process.env.DB_URI);
mongoose.connect(process.env.DB_URI, {
  usenewurlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connect successfully"));

//milddlewares -1
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

//milddleware - 2
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// set uploads folder static (It's like a milddlewares)
app.use(express.static("uploads"));

// set template engine
app.set("view engine", "ejs");

//route prefix
// app.get("/", (req, res) => {
//   res.send("Hello World db");
// });
app.use("", require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`Server run at http://localhost:${PORT}`);
});
