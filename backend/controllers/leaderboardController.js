const User = require("./models/User");

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ score: -1 }).limit(10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
