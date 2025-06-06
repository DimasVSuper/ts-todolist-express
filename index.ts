import express from "express";
import path from "path";
import morgan from "morgan";
import todoRoutes from "./router/todoRoutes";

const app = express();

app.use(morgan("dev")); // Logging setiap request
app.use(express.json());
app.use(express.static(path.join(__dirname, "view")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});