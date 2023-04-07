import express from "express";
import {
  getFeedBacks,
  getAttendee,
  getDataFinalists,

} from "../controllers/client.js";

const router = express.Router();

router.get("/feedBacks", getFeedBacks);
router.get("/attendees", getAttendee);
router.get("/dataFinalists", getDataFinalists);


export default router;
