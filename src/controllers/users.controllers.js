const { User } = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { status: "available" } });
    res.status(200).json({
      status: true,
      msg: "all users loaded 😁",
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "user not found 😕",
      });
    }

    res.status(200).json({
      status: true,
      msg: "user loaded 😁",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });

    res.status(201).json({
      status: true,
      msg: "user created success 😁",
      data: newUser,
    });
  } catch (error) {
    if (error.parent.code === "23505") {
      res.status(400).json({
        status: "fail",
        msg: "email exists 😮",
      });
    }
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "user not found 😕",
      });
    }

    const userUpdated = await user.update({ name, email });

    res.status(202).json({
      status: true,
      msg: "update user success 😁",
      data: userUpdated,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "user not found 😕",
      });
    }

    await user.update({ status: "deleted" });
    res.status(202).json({
      status: true,
      msg: "delete user success 😦",
    });
  } catch (error) {
    console.log(error);
  }
};
