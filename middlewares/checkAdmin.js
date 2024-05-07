import Express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router = Express.Router();

router.use(cookieParser());

const checkAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const result = jwt.verify(token, process.env.JWT);
    if(result.role !== 'admin'){
        return res.status(403).json({ error: "Forbidden" });
    }
    next();
    } catch (error) {
        res.status(500).json({ error: "Chưa đăng nhập" });
    }
};

export default checkAdmin;
