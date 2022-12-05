const express = require("express");
const router = express.Router();
const db = require("../models/index.model");
const { Order, Cake, Tier } = db;

router.get("/", (req, res) => {
    res.json({
        title: "Make a Cake API"
    })
})

router.get("/orders/:customer_id", (req, res) => {
    Order.findAll({
        where: {
            customer_id: req.params.customer_id
        },
        include: {
            model: Cake,
            include: {
                model: Tier
            }
        }
    })
    .then((orders) => {
        // console.log(orders)

        const cleanedOrders = orders.map(order => {
            const orderInfo = order.dataValues;
            const cakeInfo = order.Cake.dataValues;
            const tiersInfo = cakeInfo.Tiers;

            const tiers = tiersInfo.map(tier => {
                return {
                    tierOrder: tier.tier_order,
                    batterFlavor: tier.batter_flavor,
                    innerFrostings: [
                        ...tier.inner_frosting_1 ? [tier.inner_frosting_1] : [],
                        ...tier.inner_frosting_2 ? [tier.inner_frosting_2] : [],
                        ...tier.inner_frosting_3 ? [tier.inner_frosting_3] : [],
                    ],
                    outerFrostings: [
                        ...tier.outer_frosting_1 ? [tier.outer_frosting_1] : [],
                        ...tier.outer_frosting_2 ? [tier.outer_frosting_2] : [],
                        ...tier.outer_frosting_3 ? [tier.outer_frosting_3] : [],
                    ],
                    decorations: [
                        ...tier.decoration_1 ? [tier.decoration_1] : [],
                        ...tier.decoration_2 ? [tier.decoration_2] : [],
                        ...tier.decoration_3 ? [tier.decoration_3] : [],
                    ],
                    image: tier.image,
                    notes: tier.notes
                }
            })

            return {
                order: {
                    orderId: orderInfo.order_id,
                    shippingCompany: orderInfo.ship_company,
                    shippingSpeed: orderInfo.ship_speed,
                    shippingNumber: orderInfo.ship_number,
                    orderStatus: orderInfo.status,
                    orderPlacedTimedate: orderInfo.createdAt
                },
                cake: tiers,
                price: cakeInfo.price
            }
        })

        res.json(cleanedOrders)
    })
    .catch((e) => {
        console.log(e)
        res.json(e)
    })
})

module.exports = router;

// Customer: ID, First/Last Name, Email, Phone, Address, ..., Zipcode
// Order: ID, CustomerID, Shipping #, Shipping Company, Shipping Speed, Status
// Cake: ID, OrderID
// Tier: ID, CakeID, BatterFlavor, ..., Notes 