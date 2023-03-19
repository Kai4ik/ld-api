import express, { Express, Response, Request } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import "dotenv/config";
import { pino } from "pino";

const logger = pino();

import { verifyUser } from "./jwt_verify.js";
import startPostgres from "./db/index.js";
import router from "./routes/index.js";

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

startPostgres();

// Use CORS middleware so we can make requests across origins
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(async (req: Request, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== undefined) {
    logger.info(authHeader);
    const response = await verifyUser(authHeader.split(" ")[1]);
    if (response.verified) {
      const payload = response.payload;
      if (payload !== undefined) {
        res.locals.user = payload.email;
        res.locals.role = payload["custom:role"];
      }
      next();
    } else {
      res.status(401).json({
        status: "error",
        error: {
          message: "Not Authorized. Token is not valid",
          code: 401,
        },
      });
    }
  } else {
    res.status(401).json({
      status: "error",
      error: {
        message: "Not Authorized. Authorization header is not set",
        code: 401,
      },
    });
  }
});

// Use security middleware
app.use(helmet());

app.use("/v1/api", router);

// Add 404 middleware to handle any requests for resources that can't be found
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    error: {
      message: "Route Not Found",
      code: 404,
    },
  });
});

export default app;
