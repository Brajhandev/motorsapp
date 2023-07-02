const { Router } = require("express");
const {
  getAllRepairs,
  getRepairById,
  createRepair,
  updateRepair,
  deleteRepair,
} = require("../controllers/repair.controllers");
const {
  createRepairValidation,
} = require("../middlewares/validation.middleware");
const { existRepair } = require("../middlewares/repair.middleware");
const { protect, restrictTo } = require("../middlewares/auth.middleware");

const repairRouter = Router();

repairRouter.use(protect);
repairRouter.get("/", restrictTo("employee"), getAllRepairs);
repairRouter.get("/:id", restrictTo("employee"), existRepair, getRepairById);
repairRouter.post("/", createRepairValidation, createRepair);
repairRouter.patch("/:id", restrictTo("employee"), existRepair, updateRepair);
repairRouter.delete("/:id", restrictTo("employee"), existRepair, deleteRepair);

module.exports = repairRouter;
