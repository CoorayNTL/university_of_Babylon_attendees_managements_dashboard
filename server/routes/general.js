import express from "express";
import { getAttendee, getDashboardStats } from "../controllers/general.js";
import {
    createAttendees,
    deleteAttendees,
    updateAttendees,
} from "../controllers/client.js";

const router = express.Router();

router.get("/attendee/:id", getAttendee);
router.post("/attendee", createAttendees);
router.patch("/attendee/:id", updateAttendees);
router.patch("/attendee/:id", deleteAttendees);

router.get("/dashboard", getDashboardStats);

export default router;
