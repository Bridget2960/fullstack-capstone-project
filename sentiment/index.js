const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const expressPino = require('express-pino-logger')({ logger });
// Task 1: Import the Natural library
const natural = require('natural');

// Task 2: Initialize the Express server
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(expressPino);

// Task 3: Create a POST /sentiment endpoint
app.post('/sentiment', async (req, res) => {
    // Task 4: Extract the sentence parameter from the request body
    const { sentence } = req.body;

    if (!sentence) {
        logger.error('No sentence provided');
        return res.status(400).json({ error: 'No sentence provided' });
    }

    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    try {
        // Perform sentiment analysis
        const words = sentence.split(/\W+/);
        const score = analyzer.getSentiment(words);

        let sentiment = "";

        // Task 5: Process the response based on scores
        if (score < 0) {
            sentiment = 'negative';
        } else if (score <= 0.33) {
            sentiment = 'neutral';
        } else {
            sentiment = 'positive';
        }

        // Task 6: Implement success return state
        logger.info(`Sentiment analysis result: ${sentiment}`);
        res.status(200).json({ sentiment, score });

    } catch (error) {
        // Task 7: Implement error return state
        logger.error(`Error performing sentiment analysis: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});