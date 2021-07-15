const Item = require("../models/Item");

// Retrieve all items
// @route GET /api/item
const getItems = async (req, res) => {
  try {
    const items = await Item.find();

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Add a new item
// @route POST /api/item
const addItem = async (req, res) => {
  try {
    const { body } = req;

    const item = new Item({
      description: body.description,
      category: body.category,
      owner: req.user.username,
    });

    const response = await item.save();
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Update an item
// @route PUT /api/item/:id
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { username } = req.user;

    const item = await Item.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, error: "Item is not found" });
    }
    if (item.owner !== username) {
      return res
        .status(400)
        .json({ success: false, error: "You are not the owner of this item" });
    }

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
    return res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete an item
// @route DELETE /api/item/:id
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.user;

    const item = await Item.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, error: "Item is not found" });
    }
    if (item.owner !== username) {
      return res
        .status(400)
        .json({ success: false, error: "You are not the owner of this item" });
    }

    const removedItem = await Item.findByIdAndDelete(id);
    return res.status(200).json({ success: true, data: removedItem });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Search for items based on the given filter
// @route POST /api/item/search
const searchItem = async (req, res) => {
  try {
    const { description, categories, owners } = req.body;
    if (
      !description &&
      (!categories || categories.length <= 0) &&
      (!owners || owners.length <= 0)
    ) {
      return res
        .status(400)
        .json({ success: false, error: "The filter is empty" });
    }

    const filter = [];
    if (description)
      filter.push({ description: { $regex: new RegExp(description) } });
    if (categories && categories.length > 0)
      filter.push({ category: { $in: [...categories] } });
    if (owners && owners.length > 0)
      filter.push({ owner: { $in: [...owners] } });

    const item = await Item.find({ $or: filter });
    if (!item || item.length <= 0) {
      return res.status(200).json({ success: true, message: "No items found" });
    }
    
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getItems, addItem, updateItem, deleteItem, searchItem };
