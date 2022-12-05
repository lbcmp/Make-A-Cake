const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        title: "Make a Cake API"
    })
})

module.exports = router;

// Customer: ID, First/Last Name, Email, Phone, Address, ..., Zipcode
// Order: ID, CustomerID, Shipping #, Shipping Company, Shipping Speed, Status
// Cake: ID, OrderID
// Tier: ID, CakeID, BatterFlavor, ..., Notes 