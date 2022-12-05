const db = require("./models/index.model");
const { Customer, Order, Cake, Tier } = db;

const customers = [
    {
        customer_id: "12345678",
        fname: "Sarah",
        lname: "Smith",
        email: "sarah.smith@email.com",
        phone_number: "1234567890",
        address: "123 Stanton Street",
        city: "Belaru",
        state: "New York",
        zipcode: "10630"
    }
]

const orders = [
    {
        order_id: 1,
        customer_id: "12345678",
        ship_company: "Fedex",
        ship_speed: "Standard",
        ship_number: "9328578192359387",
        status: "Shipped"
    },
    {
        order_id: 2,
        customer_id: "12345678",
        ship_company: null,
        ship_speed: null,
        ship_number: null,
        status: "In-Progress"
    },
]

const cakes = [
    {
        cake_id: 1,
        order_id: 1,
        price: 40
    },
    {
        cake_id: 2,
        order_id: 2,
        price: 64
    }
]

const tiers = [
    {
        tier_id: 1,
        cake_id: 1,
        tier_order: 1,
        batter_flavor: "Vanilla",
        inner_frosting_1: "Salted Caramel",
        inner_frosting_2: "Bourbon Vanilla Bean Buttercream",
        inner_frosting_3: "",
        outer_frosting_1: "Salted Caramel",
        outer_frosting_2: "Bourbon Vanilla Bean Buttercream",
        outer_frosting_3: "",
        decoration_1: "Edible Flowers",
        decoration_2: "Piping",
        decoration_3: "",
        image: "",
        notes: "Put flowers all along the base, write 'Happy Birthday, Mom!' on top"
    },
    {
        tier_id: 2,
        cake_id: 2,
        tier_order: 1,
        batter_flavor: "Strawberry",
        inner_frosting_1: "Strawberry",
        inner_frosting_2: "",
        inner_frosting_3: "",
        outer_frosting_1: "Strawberry",
        outer_frosting_2: "",
        outer_frosting_3: "",
        decoration_1: "Fruit",
        decoration_2: "",
        decoration_3: "",
        image: "",
        notes: ""
    },
    {
        tier_id: 3,
        cake_id: 2,
        tier_order: 2,
        batter_flavor: "Confetti",
        inner_frosting_1: "American Buttercream",
        inner_frosting_2: "",
        inner_frosting_3: "",
        outer_frosting_1: "American Buttercream",
        outer_frosting_2: "",
        outer_frosting_3: "",
        decoration_1: "Piping",
        decoration_2: "Sprinkles",
        decoration_3: "",
        image: "birthday.png",
        notes: "Put the image on the top of the cake"
    }
]



const seed = () => {
    return Customer.bulkCreate(customers)
    .then(() => Order.bulkCreate(orders))
    .then(() => Cake.bulkCreate(cakes))
    .then(() => Tier.bulkCreate(tiers))
}

seed()
.then(() => process.exit());