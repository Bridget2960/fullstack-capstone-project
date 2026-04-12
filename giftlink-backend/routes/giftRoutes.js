const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Step 2: GET all gifts
router.get('/', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: use the collection() method
        const collection = db.collection("gifts");

        // Task 3: Fetch all gifts and convert to array
        const gifts = await collection.find({}).toArray();

        // Task 4: return the gifts
        res.json(gifts);
    } catch (e) {
        res.status(500).send("Error fetching gifts");
    }
});

// Step 3: GET a specific gift by ID
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const id = req.params.id;

        // Task 3: Find a specific gift by ID
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).send("Gift not found");
        }

        res.json(gift);
    } catch (e) {
        res.status(500).send("Error fetching gift");
    }
});

module.exports = router;