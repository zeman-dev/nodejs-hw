import express from "express";
import helmet from "helmet";
import "dotenv/config";
import cors from "cors";
import logger from "pino-http";

const app = express();

app.use(helmet());

app.use(cors());

app.use(logger());

app.use(express.json());

app.get("/notes", (req, res) => {
 res.status(200).json({
	message: "Retrieved all notes",
 });
})

app.get("/notes/:noteId", (req, res) =>{
  const noteID = req.params.noteId;
  res.status(200).json({
    message: `Retrieved note with ID:${noteID}`
  });
})

app.get("/test/error.js",  (req, res, next) => {
  next(new Error("Test error"));
});

app.use((req, res, next) => {
  res.status(404).json({message: "Route not found"});
})

app.use((error, req, res, next) =>{
  res.status(500).json({message: error.message});
})

app.listen(process.env.PORT || 3000, () =>{
  console.log(`Server is running on PORT=${process.env.PORT}`);
})


