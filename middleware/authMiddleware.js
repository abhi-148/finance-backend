const User = require("../models/userModel");


const protect = async (req, res, next) => {
  try {
   
    const userId = req.headers.userid;

    if (!userId) {
      return res.status(401).json({ message: "No user id provided" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };