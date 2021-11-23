require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const cors = require("cors");
const { application } = require("express");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const restaurants = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM review GROUP BY restaurant_id) review ON restaurants.id = review.restaurant_id");
        res.status(200).json({
            status: "success",
            results: restaurants.rows.length,
            data: {
                restaurants: restaurants.rows
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error
        });
    }

});

app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurants = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM review GROUP BY restaurant_id) review ON restaurants.id = review.restaurant_id WHERE id = $1", [req.params.id]);
        const reviews = await db.query("SELECT * FROM review WHERE restaurant_id = $1", [req.params.id]);

        res.status(200).json({
            status: "success",
            results: restaurants.rows.length,
            data: {
                restaurant: restaurants.rows[0],
                reviews: reviews.rows
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: error
        });
    }
});

app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const restaurants = await db.query("INSERT INTO restaurants(name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json({
            status: "success",
            results: restaurants.rows.length,
            data: {
                restaurant: restaurants.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: error
        });
    }
});


app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurants = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.status(203).json({
            status: "success",
            results: restaurants.rows.length,
            data: {
                restaurant: restaurants.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: error
        });
    }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurants = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: error
        });
    }
});


app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const review = await db.query("INSERT INTO review(name, review, rating, restaurant_id) values ($1, $2, $3, $4) returning *", [req.body.name, req.body.review, req.body.rating, req.params.id]);
        res.status(201).json({
            status: "success",
            results: review.rows.length,
            data: {
                restaurant: review.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: error
        });
    }
});


const port = process.env.YELP_PORT || 8000;

app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});