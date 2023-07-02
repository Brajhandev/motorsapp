const { User } = require("../models/user.model");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    //1. extraer el token
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //2. validar si existe el token
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "you are not logged in! Please log in to get access",
      });
    }

    //3. decodificar el jwt
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_JWT_SEED
    );

    //4. buscar el usuario y validar que exista
    const user = await User.findOne({
      where: {
        id: decoded.id,
        status: "available",
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "The owner of this token it not longer available",
      });
    }

    req.sessionUser = user;
    //el usuario en sesion es el usuario dueño del toquen
    //que para saber si un usuario esta en session debo validar el token
    //el usuario en session proviene del middleware protect que esta en authMiddleware
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to perform this action!",
      });
    }

    next();
  };
};
