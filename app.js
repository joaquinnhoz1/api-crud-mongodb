require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path"); 
const connectDB = require("./src/config/db");

const productRoutes = require("./src/routes/productRoute");
const userRoutes = require("./src/routes/userRoute");
const categoryRoutes = require("./src/routes/categoryRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});