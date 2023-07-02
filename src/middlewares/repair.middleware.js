const { Repairs } = require("../models/repair.model");

exports.existRepair = async (req, res, next) => {
  try {
    const { id } = req.params;
    const repair = await Repairs.findOne({ where: { id, status: "pending" } });

    if (!repair) {
      return res.status(404).json({
        status: false,
        msg: "repair not found 😕",
      });
    }
    req.repair = repair;
    next();
  } catch (error) {
    console.log(error);
  }
};
