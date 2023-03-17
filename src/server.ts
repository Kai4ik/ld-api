import express, { Express, Response, Request } from "express";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";

const app: Express = express();

/* const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
}; */

dotenv.config();

// Use CORS middleware so we can make requests across origins
app.use(cors());

// Use security middleware
app.use(helmet());

// Add 404 middleware to handle any requests for resources that can't be found
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    error: {
      message: "not found",
      code: 404,
    },
  });
});

export default app;
