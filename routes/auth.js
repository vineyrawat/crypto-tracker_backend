const router = require("express").Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { User, validate, validateLogin } = require("../models/userModel");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = validate({ name, email, password });
  if (error)
    return res.json({ status: "failure", error: error.details[0].message });
  let user = await User.findOne({ email });
  if (user) {
    return res.json({ status: "failure", error: "Email already registered" });
  } else {
    user = new User({ name: name, email: email, password: password });
    const data = await user.save();
    res.json({
      status: "success",
      data: _.pick(data, ["_id", "name", "email"]),
      token: jwt.sign(
        _.pick(data, ["_id", "name", "email"]),
        process.env.JWT_PRIVATE_KEY
      ),
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { error } = validateLogin({ email, password });
  if (error) {
    return res.json({ status: "failure", error: error.details[0].message });
  }
  let user = await User.findOne({ email, password });
  if (user) {
    user = _.pick(user, ["_id", "name", "email"]);
    return res.json({
      status: "success",
      token: jwt.sign(user, process.env.JWT_PRIVATE_KEY),
    });
  }
  return res.json({ status: "failure", error: "Invalid email or password" });
});

router.get("/watchlist/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) return res.send([]);
  return res.send(user.watchlist);
});

router.post("/watchlist/add", async (req, res) => {
  const { token, item } = req.body;
  const { email } = jwt.decode(token);
  if (!email) return res.send("Invalid token");
  if (!item) return res.send("Please provide at least one item to add");
  const user = await User.findOne({ email });
  if (!user) return res.send("Invalid token");
  const watchlist = user.watchlist;
  if (watchlist.includes(item)) return res.send("Successfully added");
  User.updateOne({ email }, { watchlist: [...watchlist, item] })
    .then((data) => res.send("Successfully added"))
    .catch((err) => res.status(500).send("Unable to add"));
});

router.post("/watchlist/remove", async (req, res) => {
  const { token, item } = req.body;
  const { email } = jwt.decode(token);
  if (!email) return res.send("Invalid token");
  if (!item) return res.send("Please provide at least one item to remove");
  const user = await User.findOne({ email });
  if (!user) return res.send("Invalid token");
  let watchlist = user.watchlist;
  if (!watchlist.includes(item)) return res.send("Successfully removed");
  const itemIndex = watchlist.indexOf(item);
  watchlist.splice(itemIndex, 1);
  User.updateOne({ email }, { watchlist: watchlist })
    .then((data) => res.send("Successfully removed"))
    .catch((err) => res.status(500).send("Unable to remove"));
});

module.exports = router;
