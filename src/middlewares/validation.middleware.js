const { validationResult, body } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }
  next();
};

exports.createLoginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be null")
    .isEmail()
    .withMessage("Email must be a correct format"),
  body("password").notEmpty().withMessage("Password cannot be null"),
  validateFields,
];

exports.createRegisterValidation = [
  body("name").notEmpty().withMessage("Name cannot be null"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be null")
    .isEmail()
    .withMessage("Email must be a correct format"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be null")
    .isLength({ min: 6 })
    .withMessage("password must 6 characters")
    .matches(/\d/)
    .withMessage("password must 1 character number")
    .matches(/[A-Z]/)
    .withMessage("password must 1 uppercase character")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("password must 1 especial character"),
  validateFields,
];

exports.updateRegisterValidation = [
  body("name").notEmpty().withMessage("Name cannot be null"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be null")
    .isEmail()
    .withMessage("Email must be a correct format"),
  validateFields,
];

exports.createRepairValidation = [
  body("date").notEmpty().withMessage("Date cannot be null"),
  body("motorsNumber").notEmpty().withMessage("motorsNumber cannot be null"),
  body("description").notEmpty().withMessage("description cannot be null"),
  validateFields,
];
