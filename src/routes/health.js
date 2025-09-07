import express from "express";
import logger from "../utils/logger.js"
const router = express.Router();

router.get("/", (req, res) => {
    logger.info("Root endpoint hit");
    res.json({ message: "Hello Pedro API 🚀" });
});

export default router;