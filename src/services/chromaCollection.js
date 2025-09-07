import { ChromaClient } from "chromadb";
import logger from "../utils/logger.js"
import AppError from "../utils/appError.js"

const CHROMA_URL = process.env.CHROMA_URL || "http://localhost:8000";
const chroma = new ChromaClient({ url: CHROMA_URL });
let collection;

export async function initChroma() {
    collection = await chroma.getOrCreateCollection({ name: "docs" });
    logger.info("Chroma collection ready");
}

export async function addCollection(id, text, embedding) {
    return await collection.add({
        ids: [String(id)],
        documents: [text],
        embeddings: [embedding]
    });
}

export async function addCollections(ids, texts, embeddings) {
    if (!Array.isArray(ids) || !Array.isArray(texts) || !Array.isArray(embeddings)) {
        throw new AppError("ids, texts, and embeddings must be arrays", 400);
    }

    return await collection.add({
        ids: ids.map(String),
        documents: texts,
        embeddings: embeddings,
    });
}

export async function queryCollection(params) {
    const queryEmbedding = params;
    return await collection.query({
        queryEmbeddings: [queryEmbedding], // wrap in array
        n_results: 3
    });

}