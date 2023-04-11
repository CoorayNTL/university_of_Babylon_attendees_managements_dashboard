import express from "express";
import {
    getAdministrator,
    getAttendeePerformance,
} from "../controllers/management.js";

const router = express.Router();

router.get("/administrator", getAdministrator);
router.get("/performance/:id", getAttendeePerformance);

export default router;
