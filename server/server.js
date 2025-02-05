require("dotenv").config();
const express = require("express");
const cluster = require("cluster");
const os = require("os");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const ConnectDB = require("./config/db");
const authRouter = require("./router/auth-router");
const productRouter = require("./router/product-router");
const cartRouter = require("./router/cart-router");
const categoryRouter = require("./router/category-router");
const commentRouter = require("./router/comment-router");

const PORT = process.env.PORT || 5000;
const numCPUs = os.cpus().length; // Get the number of CPU cores

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart worker if it crashes
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
    message: {
      status: 429,
      message:
        "Too many requests from this IP, please try again after 15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(morgan("dev"));
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const allowedOrigins = [
    "https://shop-wiz.vercel.app/", // Production URL
    "https://shop-wiz-git-master-sandeep-singh-99s-projects.vercel.app/", // Preview URL
    "https://shop-qqy07d7hb-sandeep-singh-99s-projects.vercel.app/",
    "https://shop-wiz-sandeep-singh-99s-projects.vercel.app/",
    "http://localhost:3000",
  ];

  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the request
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use("/api/auth", authRouter);
  app.use("/api/product", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/getProductByCategory", categoryRouter);
  app.use("/api/comment", commentRouter);

  app.use((err, req, res, next) => {
    console.log("Error: ", err.stack);
    res.status(501).send(`Something broke! ${err.message}`);
  });

  ConnectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `Worker ${process.pid} is running on http://localhost:${PORT}`
        );
      });
    })
    .catch((error) => {
      console.log("Failed to connect to MongoDB");
    });
}
