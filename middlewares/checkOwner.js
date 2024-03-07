import Express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router = Express.Router();

router.use(cookieParser());

const checkOwner = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      console.error("Không tìm thấy token trong cookie");
      return res.status(401).json({ error: "Unauthorized" });
    }
    const result = jwt.verify(token, process.env.JWT);
    if(result.role !== 'owner'){
        return res.status(403).json({ error: "Forbidden" });
    }
    next();
    } catch (error) {
        res.status(500).json({ error: "Chưa đăng nhập" });
    }
};

export default checkOwner;
