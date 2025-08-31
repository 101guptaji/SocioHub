import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    next();
  }
  catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};