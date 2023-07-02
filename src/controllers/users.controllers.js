const { User } = require("../models/user.model");
const generateJWT = require("../utils/jwt");
const bcrypt = require("bcryptjs");

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
    const { user } = req;

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
    const token = await generateJWT(newUser.id);
    res.status(201).json({
      status: true,
      msg: "user created success 😁",
      data: newUser,
      token,
    });
  } catch (error) {
    console.log(error);
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
    const { user } = req;
    const { name, email } = req.body;

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
    const { user } = req;

    await user.update({ status: "deleted" });
    res.status(202).json({
      status: true,
      msg: "delete user success 😦",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { password: pass } = req.body;
    const { user } = req;

    if (!(await bcrypt.compare(pass, user.password))) {
      return res.status(401).json({
        status: false,
        msg: "password is wrong 😦",
      });
    }
    const token = await generateJWT(user.id);
    user.password = undefined;
    res.status(200).json({
      status: true,
      msg: "login success 😁",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
