import dotenv from "dotenv";
import app from "./app.js";
import logger from "./utils/logger.js"
import { initEmbedder } from "./services/embedder.js";
import { initChroma } from "./services/chromaCollection.js";

dotenv.config();

await initEmbedder();
await initChroma();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));