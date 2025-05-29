const express = require("express");
const router = express.Router();
const { Customer, Order } = require("../model/schemas"); // Update path if different

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

// GET /api/latest-customer-id
router.get("/latest-customer-id", isAuthenticated, async (req, res) => {
  try {
    const latest = await Customer.findOne().sort({ customer_id: -1 });
    const nextId = latest ? String(Number(latest.customer_id) + 1) : "10001";
    res.json({ nextCustomerId: nextId });
  } catch (err) {
    console.error("Error fetching latest customer ID:", err);
    res.status(500).json({ message: "Failed to get latest customer ID" });
  }
});

router.get("/latest-order-id", isAuthenticated, async (req, res) => {
  try {
    const latest = await Order.findOne().sort({ order_id: -1 });
    const nextId = latest ? String(Number(latest.order_id) + 1) : "10001";
    res.json({ nextOrderId: nextId });
  } catch (err) {
    console.error("Error fetching latest order ID:", err);
    res.status(500).json({ message: "Failed to get latest order ID" });
  }
});

router.get("/get-dashboard-data", isAuthenticated, (req, res) => {
  try {
    // Assuming Passport.js sets the user info on req.user after Google OAuth
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Extract the user's name
    const userName = req.user.displayName || req.user.name || "Unknown";

    // Optionally, print to server console
    console.log("Logged in user name:", userName);

    // Send the name back in response
    res.json({ name: userName });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------- Add Customer --------------------
router.post("/add-customer", isAuthenticated, async (req, res) => {
  try {
    const { customer_id, name, email, phone } = req.body;

    const existingCustomer = await Customer.findOne({ customer_id });
    if (existingCustomer) {
      return res.status(409).json({ message: "Customer already exists" });
    }

    const newCustomer = new Customer({
      customer_id,
      name,
      email,
      phone,
    });

    await newCustomer.save();
    res
      .status(201)
      .json({ message: "Customer added successfully", customer: newCustomer });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({
      message: "Error adding customer",
      error: error.message || error,
    });
  }
});

// -------------------- Add Order --------------------
router.post("/add-order", isAuthenticated, async (req, res) => {
  try {
    const { order_id, customer_id, amount, items, status } = req.body;

    const customer = await Customer.findOne({ customer_id });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const newOrder = new Order({
      order_id,
      customer_id,
      amount,
      items,
      status,
    });

    // Save Order
    await newOrder.save();

    // Update Customer Stats
    customer.total_spent += amount;
    customer.total_orders += 1;
    customer.last_order_date = newOrder.order_date;
    await customer.save();

    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
});

module.exports = router;
