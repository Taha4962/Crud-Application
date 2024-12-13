import express from "express";
import cors from "cors";
import clientRoutes from "./routes/user.routes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/clients", clientRoutes);

app.listen(port, () => {
  console.log("listening on port 3000");
});
