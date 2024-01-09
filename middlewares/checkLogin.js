import  Express  from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const router = Express.Router();

// Thêm phần middleware cookie-parser để xử lý cookie
router.use(cookieParser());
const checkLogin = (req, res, next) => {
    try {
      const token = req.cookies.token;
      // console.log('Received token:', token); // In ra giá trị của token nhận được từ cookie
      const result = jwt.verify(token, process.env.JWT);
      //console.log('Decoded token:', result); // In ra kết quả xác thực token
      if (result) {
        req.user = result; // Lưu thông tin user vào request object
        next();
      }else{
        res.status(500).json({ error :'Invalid token !!!'});
      }
    } catch (error) {
      console.log('Error:', error); // In ra console nếu có lỗi xảy ra
      // Trả về mã lỗi 500 (Internal Server Error) và thông báo lỗi dưới dạng JSON
      res.status(500).json({ error: 'Bạn cần đăng nhập' });
    }
}

export default  checkLogin;