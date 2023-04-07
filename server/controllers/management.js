import mongoose from "mongoose";
import Attendee from "../models/Attendee.js";
import DataFinalists from "../models/DataFinalists.js";

export const getAdministrator = async (req, res) => {
  try {
    const administrator = await Attendee.find({ role: "administrator" }).select("-password");
    res.status(200).json(administrator);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAttendeePerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendeeWithStats = await Attendee.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "attendeeId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const eventsDataFinalists = await Promise.all(
      attendeeWithStats[0].affiliateStats.affiliateEvents.map((id) => {
        return DataFinalists.findById(id);
      })
    );
    const filteredEventsDataFinalists = eventsDataFinalists.filter(
      (dataFinalists) => dataFinalists !== null
    );

    res
      .status(200)
      .json({
        attendee: attendeeWithStats[0],
        events: filteredEventsDataFinalists,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
