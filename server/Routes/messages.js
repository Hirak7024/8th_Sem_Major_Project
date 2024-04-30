import express from "express";
import { insertIntoMessages, updateMessage,getMessagesBySenderEmail,getMessagesByReceiverEmail } from "../Controllers/Messages.js";

const router = express.Router();

router.post("/insert", insertIntoMessages);
router.put("/update", updateMessage);
router.post("/fetchMessage", getMessagesBySenderEmail);
router.post("/receiver/fetchMessage", getMessagesByReceiverEmail);

export default router;