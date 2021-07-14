const express = require("express");
const router = express.Router();
const Item = require("../model/Item");
const auth = require("../middleware/auth");

// Retrieve all items
// @route GET /api/items
router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find();

    return res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new item
// @route POST /api/items
router.post("/", auth, async (req, res) => {
  try {
    const { body } = req;

    const item = new Item({
      description: body.description,
      category: body.category,
      owner: req.user.username,
    });

    const response = await item.save();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an item
// @route PUT /api/items/:id
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { username } = req.user;

    const item = await Item.findById(id);
    if (item.owner !== username)
      throw new Error("You can only update your own item");

    const updatedItem = await Item.updateOne(
      { _id: id },
      {
        $set: {
          description: body.description,
          category: body.category,
          owner: username,
        },
      }
    );
    return res.status(200).json(updatedItem);
  } catch (error) {
    if (error.message === "You can only update your own item") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Delete an item
// @route DELETE /api/items/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.user;

    const item = await Item.findById(id);
    if (!item) throw new Error("Item not found");
    if (item.owner !== username)
      throw new Error("You can only update your own item");

    const removedItem = await Item.findByIdAndDelete(id);
    return res.status(200).json(removedItem);
  } catch (error) {
    if (error.message === "Item not found") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
