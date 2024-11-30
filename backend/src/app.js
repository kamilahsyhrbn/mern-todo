const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./config/database");
const { port } = require("./config/env");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const morgan = require("morgan");

const app = express();

// MongoDB connection
connectDB();

// Middleware
app.use(morgan("dev")); // Logs incoming requests
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON payloads

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API documentation for Task Management System",
    },
    servers: [
      {
        url: process.env.SERVER_URL, // Replace with your actual Vercel URL
        description: "Production server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to your routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
