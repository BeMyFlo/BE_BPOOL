const express = require('express');
const app = express();
const db = require('./model/db');
const pet = require('./routers/pet');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware để đảm bảo kết nối MySQL đã được thiết lập trước khi xử lý yêu cầu
app.use((req, res, next) => {
  if (!db) {
    // Nếu không có kết nối, trả về lỗi
    return res.status(500).send('Không thể kết nối tới cơ sở dữ liệu');
  }
  next(); // Tiếp tục xử lý yêu cầu nếu đã có kết nối
});
app.use('/v1/pet',pet);

app.listen(3000,(req,res)=>{
    console.log('Kết nối tới server thành công');
})