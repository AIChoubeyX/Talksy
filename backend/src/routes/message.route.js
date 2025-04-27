// import express from "express"
// import { protectRoute } from "../middlewares/auth.middleware.js";
// import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

// const router = express.Router()

// router.get("/users" , protectRoute, getUsersForSidebar)
// router.get("/:id" , protectRoute , getMessages)
// router.post("/send/:id" , protectRoute , sendMessage)


// export default router;


import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

// Get all users except logged-in user
router.get("/users", protectRoute, getUsersForSidebar);

// Get chat messages between two users
router.get("/:id", protectRoute, getMessages);

// Send a message to a user
router.post("/send/:id", protectRoute, sendMessage);

export default router;
