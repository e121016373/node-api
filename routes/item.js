const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  searchItem,
} = require("../controllers/item");

// Middleware
router.use(isAuthenticated);

// Endpoints
router
  .route("/")
  .get(getItems)
  .post(addItem);

router
  .route("/:id")
  .put(updateItem)
  .delete(deleteItem);

router
  .route("/search")
  .post(searchItem);

module.exports = router;
