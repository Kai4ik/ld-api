import stoppable from "stoppable";
import { pino } from "pino";
import { env } from "process";
import app from "./server.js";

const logger = pino();
const port: number = (env.PORT && parseInt(env.PORT)) || 8080;

process.on("uncaughtException", (err, origin) => {
  logger.fatal({ err, origin }, "uncaughtException");
  throw err;
});

process.on("unhandledRejection", (reason, promise) => {
  logger.fatal({ reason, promise }, "unhandledRejection");
  throw reason;
});

stoppable(
  app.listen(port, () => {
    logger.info({ port }, "Server started");
  })
);
