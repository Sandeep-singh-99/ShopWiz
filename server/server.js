require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 5001;
const ConnectDB = require("./config/db");
const authRouter = require("./router/auth-router");
const productRouter = require("./router/product-router");
const cartRouter = require("./router/cart-router");
const categoryRouter = require("./router/category-router");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: {
    status: 429,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    // exposedHeaders: ["set-cookie"],
  })
);
app.use(cookieParser());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/getProductByCategory", categoryRouter);

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB");
  });
