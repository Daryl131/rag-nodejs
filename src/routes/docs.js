import express from "express";
import { getEmbedding } from "../services/embedder.js";
import asyncHandler from "../utils/asyncHandler.js"
import logger from "../utils/logger.js";
import { addCollection, queryCollection, addCollections } from "../services/chromaCollection.js"
const router = express.Router();

// Add a document
router.post("/add-doc", asyncHandler(async (req, res) => {
    const { id, text } = req.body;
    if (!id || !text) return res.status(400).json({ error: "id and text required" });
    try {
        const embedding = await getEmbedding(text);

        await addCollection(id, text, embedding);

        res.json({ status: "document added" });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: err.message });
    }
}));

// Query documents
router.post("/query", asyncHandler(async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "question required" });

    try {
        const queryEmbedding = await getEmbedding(question);

        const results = await queryCollection(queryEmbedding)

        res.json({ results });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: err.message });
    }
}));

router.post("/add-docs", asyncHandler(async (req, res) => {
    const { ids, texts } = req.body;

    if (!Array.isArray(ids) || !Array.isArray(texts) || ids.length !== texts.length) {
        return res.status(400).json({ error: "ids and texts must be arrays of same length" });
    }

    try {
        // Generate embeddings for all docs
        const embeddings = await Promise.all(texts.map(async (t) => {
            const emb = await getEmbedding(t);
            return Array.from(emb);
        }));

        await addCollections(ids.map(String), texts, embeddings);

        res.json({ status: `${ids.length} documents added successfully` });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: err.message });
    }
}));

export default router;