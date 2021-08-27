const express = require("express");
const hbs = require("hbs");
const path = require("path");

// DATABASE CODE:
// require("./db/connect");
// const Suggestion = require("./model/schema");

const app = express();

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const partial_path = path.join(__dirname, "../templates/partials");
const views_path = path.join(__dirname, "../templates/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", views_path);

hbs.registerPartials(partial_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("/feedback", (req, res) => {
  res.render("feedback");
});

app.get("*", (req, res) => {
  res.send("Error found");
});

app.post("/feedback", async (req, res) => {
  try {
    const userInfo = new Suggestion({
      name: req.body.name,
      email: req.body.email,
      feedback: req.body.feedback,
    });
    const registered = await userInfo.save();
    res.render("index");
  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(port, () => {
  console.log(`you are Welcome to port ${port}`);
});
