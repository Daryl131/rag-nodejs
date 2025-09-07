import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.js"
import { errorHandler } from "./middlewares/errorHandler.js";
import docRoutes from "./routes/docs.js";
import healthRoutes from "./routes/health.js";

const app = express();
app.use(errorHandler);
app.use(cors());
app.use(express.json());
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  })
);

app.use("/", healthRoutes);
app.use("/docs", docRoutes);

export default app;
