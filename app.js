const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");
// load config

dotenv.config({ path: "./config/config.env" });

// passport Config

require("./config/passport.js")(passport);

connectDB();

const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// handlebars
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Sessions

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder

app.use(express.static(path.join(__dirname, "public")));

// Routes

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
