import express from "express";
import helmet from "helmet";
import path from "node:path";
import "dotenv/config";
import cors from "cors";
import logger from "pino-http";

const errorPath = path.join(import.meta.dirname, "test", "error.js");

const app = express();

app.use(helmet());

app.use(cors());

app.use(logger());

app.get("/notes", (req, res) => {
 res.status(200).json({
  succsess: true,
  message: "notes fetch succsessfully",
 });
})

app.get("/notes:noteId", (req, res) =>{
  const noteID = req.params.noteId;
  res.status(200).json({
    message: `Retrieved note with ID:${noteID}`
  });
})

app.get(errorPath, (req, res) =>{
})

app.use((req, res, next) => {
  res.status(404).json({message: "Route not found"});
})

app.use((error, req, res, next) =>{
  res.status(500).json({message: error.message});
})

express.listen(process.env.PORT, () =>{
  console.log(`Server is running on PORT=${process.env.PORT}`);
})


