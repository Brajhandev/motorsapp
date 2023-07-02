const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users.controllers");
const {
  createRegisterValidation,
  updateRegisterValidation,
  createLoginValidation,
} = require("../middlewares/validation.middleware");
const { existUser, existUserEmail } = require("../middlewares/user.middleware");
const { protect } = require("../middlewares/auth.middleware");

const usersRouter = Router();

usersRouter.get("/", protect, getAllUsers);
usersRouter.get("/:id", protect, existUser, getUserById);
usersRouter.post("/", createRegisterValidation, createUser);
usersRouter.patch(
  "/:id",
  protect,
  existUser,
  updateRegisterValidation,
  updateUser
);
usersRouter.delete("/:id", protect, existUser, deleteUser);
usersRouter.post("/login", existUserEmail, createLoginValidation, login);

module.exports = usersRouter;
