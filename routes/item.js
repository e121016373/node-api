const express = require("express");
const router = express.Router();
const Item = require("../model/Item");
const verify = require("../middleware/auth");

// Retrieve all items
// @route GET /api/items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();

    return res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new item
// @route GET /api/items
router.post("/", verify, async (req, res) => {
  try {
    const { body } = req;

    const item = new Item({
      name: body.name,
      category: body.category,
      owner: body.owner,
    });

    const response = await item.save();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an item
// @route POST /api/items/:id
router.put("/:id", verify, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updatedItem = await Item.updateOne(
      { _id: id },
      {
        $set: {
          name: body.name,
          category: body.category,
          owner: body.owner,
        },
      }
    );
    return res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an item
// @route DELETE /api/items/:id
router.delete("/:id", verify, async (req, res) => {
  try {
    const { id } = req.params;

    const removedItem = await Item.findByIdAndDelete({ _id: id });
    return res.status(200).json(removedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
