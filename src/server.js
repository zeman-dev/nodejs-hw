import express from "express";
import helmet from "helmet";
import "dotenv/config";
import cors from "cors";
import logger from "pino-http";
import {connectMongoDB} from "./db/connectMongoDB.js"
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import router from "./routes/notesRoutes.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(logger());

app.use(express.json());

app.use(logger());

app.use(router);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`Server is running on PORT=${PORT}`);
})


