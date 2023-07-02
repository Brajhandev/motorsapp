const { Repairs } = require("../models/repair.model");
const { User } = require("../models/user.model");

exports.getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repairs.findAll({ where: { status: "pending" } });
    res.status(200).json({
      status: true,
      msg: "all repairs loaded 😁",
      data: repairs,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getRepairById = async (req, res) => {
  try {
    const { repair } = req;

    res.status(200).json({
      status: true,
      msg: "repair by id success 😁",
      data: repair,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createRepair = async (req, res) => {
  try {
    const { date, userId, motorsNumber, description } = req.body;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        msg: "useId not exist 😥",
      });
    }
    const newRepair = await Repairs.create({
      date,
      userId,
      motorsNumber,
      description,
    });

    res.json({
      status: true,
      msg: "new repair created success 😁",
      data: newRepair,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { repair } = req;

    const repairUpdated = await repair.update({ status: "completed" });

    res.json({
      status: true,
      msg: "update user success 😁",
      data: repairUpdated,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const { repair } = req;

    const { status } = repair;

    if (status === "completed") {
      return res.status(400).json({
        status: false,
        msg: "repair is completed 🤔, not change a cancelled",
      });
    }

    await repair.update({ status: "cancelled" });
    res.json({
      status: true,
      msg: "delete repair success 😁",
    });
  } catch (error) {
    console.log(error);
  }
};
