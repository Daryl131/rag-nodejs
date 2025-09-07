import { pipeline } from "@huggingface/transformers";
import logger from "../utils/logger.js"
import AppError from "../utils/appError.js"
let embedder;

// Load model on startup
export async function initEmbedder() {
    logger.info("Loading embedding model...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
        cache_dir: process.env.MODEL_CACHE
    });
    logger.info("Model ready!");
}

// Generate embeddings
export async function getEmbedding(text) {
    if (!embedder) throw new AppError("Embedder not initialized", 400);

    const output = await embedder(text, { pooling: "mean", normalize: true });

    // Fix: extract Float32Array or nested array safely
    let vector;
    if (output.data && output.data.length) {
        vector = Array.from(output.data); // Flattened embedding
    } else if (Array.isArray(output) && Array.isArray(output[0])) {
        vector = Array.from(output[0]); // Fallback if nested
    } else if (Array.isArray(output) && typeof output[0] === "number") {
        vector = output; // Already flat
    } else {
        throw new AppError("Unexpected embedding format", 400);
    }

    logger.info("Embedding length:", vector.length, "sample:", vector.slice(0, 5));
    return vector;
}
