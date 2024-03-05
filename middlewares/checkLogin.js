import Express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router = Express.Router();

// Thêm phần middleware cookie-parser để xử lý cookie
router.use(cookieParser());

const checkLogin = (req, res, next) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      // Nếu không tìm thấy token trong cookie, ghi log lỗi và trả về mã lỗi 401
      console.error("Không tìm thấy token trong cookie");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Xác minh và giải mã token
    const result = jwt.verify(token, process.env.JWT);

    // Nếu thành công, lưu thông tin user vào request object và chuyển tiếp đến middleware tiếp theo
    req.user = result;
    next();
  } catch (error) {
    console.error("Lỗi khi giải mã token:", error);
    // Trả về lỗi 500 và thông báo lỗi nếu có lỗi xảy ra trong quá trình xác minh token
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default checkLogin;
