const { User } = require("../models/user.model");

exports.existUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id, status: "available" } });

    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "user not found 😕",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.existUserEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email, status: "available" } });
    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "user not found 😕",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(console.error());
  }
};
