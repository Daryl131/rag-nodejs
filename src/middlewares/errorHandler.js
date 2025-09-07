import logger from "../utils/logger.js";

// Centralized error handler middleware
export function errorHandler(err, req, res, next) {
  logger.error(`${err.message} \n ${err.stack}`);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}