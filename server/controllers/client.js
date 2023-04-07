import FeedBack from "../models/FeedBack.js";
import FeedBackStat from "../models/FeedBackStat.js";
import Attendee from "../models/Attendee.js";
import DataFinalists from "../models/DataFinalists.js";


export const getFeedBacks = async (req, res) => {
  try {
    const feedBacks = await FeedBack.find();

    const feedBacksWithStats = await Promise.all(
      feedBacks.map(async (feedBack) => { 
        const stat = await FeedBackStat.find({
          feedBackId: feedBack._id,
        });
        return {
          ...feedBack._doc,
          stat,
        };
      })
    );

    res.status(200).json(feedBacksWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAttendee = async (req, res) => {
  try {
    const attendee = await Attendee.find({ role: "attendee" }).select(
      "-password"
    );
    res.status(200).json(attendee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDataFinalists = async (req, res) => {
  try {
    // sort should look like this: { "field": "attendeeId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { attendeeId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const dataFinalists = await DataFinalists.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { attendeeId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await DataFinalists.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      dataFinalists,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

