const { Router } = require("express");
const {
  getAllRepairs,
  getRepairById,
  createRepair,
  updateRepair,
  deleteRepair,
} = require("../controllers/repair.controllers");

const repairRouter = Router();

repairRouter.get("/", getAllRepairs);
repairRouter.get("/:id", getRepairById);
repairRouter.post("/", createRepair);
repairRouter.patch("/:id", updateRepair);
repairRouter.delete("/:id", deleteRepair);

module.exports = repairRouter;
