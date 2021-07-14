const router = require("express").Router();
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
    res.status(404).json({
      status: "error",
      error: "Unable to fetch" + id,
    });
  } else {
    res.json({
      status: "success",
      response: data.data,
    });
  }
});

router.post("/", async (req, res) => {
  const { watchlist } = req.body;
  if (!watchlist)
    return res.send({ status: "failure", error: "watchlist is required" });
  const [data, error] = await asset.getFiltered(watchlist);

  if (error) {
    res.status(404).json({
      status: "error",
      error: "Unable to fetch data",
    });
  } else {
    res.json({
      status: "success",
      response: data,
    });
  }
});

module.exports = router;
