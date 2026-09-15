import express from "express";
import helmet from "helmet";
import "dotenv/config";
import cors from "cors";
import {logger} from "./middleware/logger.js"
import {connectMongoDB} from "./db/connectMongoDB.js"
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import notesRouter from "./routes/notesRoutes.js";
import {errors} from "celebrate"

const app = express();

// {LIBRARIES}

app.use(helmet());

app.use(cors());

app.use(logger());

app.use(express.json());

// {ROUTES}

app.use(notesRouter);

// {ERROR MIDDLEWARE}

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

// {CONNECTION TO DB}

await connectMongoDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`Server is running on PORT=${PORT}`);
})


