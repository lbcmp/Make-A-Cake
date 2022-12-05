"use strict";

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const PORT = process.env.PORT;

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./models/index.model");
app.use("/api", require("./controllers/index.controller"));
const cors = require("cors");
app.use(cors());

const synchronizeTables = async() => {
    await db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Dropped and re-synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
}
synchronizeTables();

app.listen(PORT, () => console.log(`Listening on ${PORT}`));