import express from "express";
import {
    getAdministrator,
    createAdministrator,
    getAttendeePerformance,
    updateAdministrator,
    deleteAdministrator,
 
} from "../controllers/management.js";

const router = express.Router();

router.get("/administrator", getAdministrator);
router.post("/administrator", createAdministrator);
router.patch("/administrator/:id", updateAdministrator);
router.delete("/administrator/:id", deleteAdministrator);
router.get("/performance/:id", getAttendeePerformance);


export default router;
