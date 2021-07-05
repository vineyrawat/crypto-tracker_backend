const router = require("express").Router();
const { logoUrl } = require("../config/coincap");
const asset = require("../controllers/assets");

router.get("/", async (req, res) => {
  const [data, error] = await asset.getAll();
  if (error) {
    res.status(500).json({
      status: "error",
      error: "Unable to fetch assets",
    });
  } else {
    res.json({
      status: "success",
      response: data.data,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [data, error] = await asset.get(id);
  if (error) {
    res.status(500).json({
      status: "error",
      error: "Unable to fetch " + id,
    });
  } else {
    res.json({
      status: "success",
      response: data.data,
    });
  }
});

router.get("/logo/:id/:symbol", (req, res) => {
  const { id, symbol } = req.params;
  res.redirect(logoUrl(id, symbol));
});

module.exports = router;
