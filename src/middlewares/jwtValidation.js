import jwt from "jsonwebtoken";

const checkJwtToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { checkJwtToken };
