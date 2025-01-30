const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3001", // Permite requisições do front-end
  methods: ["GET", "POST"], // Permite apenas os métodos necessários
  allowedHeaders: ["Content-Type"]
}));

// MongoDB Connection
mongoose
  .connect("mongodb://admin:admin@localhost:27017/crudDB", {
    authSource: "admin", // Necessário se a autenticação estiver configurada no banco
  })
  .then(async () => {
    console.log("MongoDB connected");

    // Garantir que coleções sejam criadas
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (!collections.some((col) => col.name === "users")) {
      console.log("Inicializando a coleção 'users'");
      await mongoose.connection.db.createCollection("users");
    }
    if (!collections.some((col) => col.name === "startups")) {
      console.log("Inicializando a coleção 'startups'");
      await mongoose.connection.db.createCollection("startups");
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));


// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API",
      version: "1.0.0",
      description: "API for managing Users and Startups",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const startupSchema = new mongoose.Schema({
  name: String,
  industry: String,
  founder: String,
  foundedDate: Date,
});

const User = mongoose.model("User", userSchema);
const Startup = mongoose.model("Startup", startupSchema);

/// USER ROUTES ///

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of all users
 */
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/// STARTUP ROUTES ///

/**
 * @swagger
 * /startups:
 *   get:
 *     summary: Get all startups
 *     responses:
 *       200:
 *         description: List of all startups
 */
app.get("/startups", async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /startups:
 *   post:
 *     summary: Create a new startup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               industry:
 *                 type: string
 *               founder:
 *                 type: string
 *               foundedDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Startup created successfully
 */
app.post("/startups", async (req, res) => {
  try {
    const startup = new Startup(req.body);
    await startup.save();
    res.status(201).json(startup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Check if the API is online
 *     responses:
 *       200:
 *         description: API status
 */
app.get("/status", (req, res) => {
  res.status(200).send("API Online");
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
