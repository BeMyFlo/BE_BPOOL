// petController.js
const db = require('../model/db');

const petController = {
  addPet: (req, res) => {
    const { name, age, species } = req.body; // Giả sử thông tin pet được gửi từ client qua request body

    // Thực hiện truy vấn INSERT để thêm pet mới vào bảng pets
    const sql = 'INSERT INTO pet (name, age, species) VALUES (?, ?, ?)';
    db.query(sql, [name, age, species], (err, result) => {
      if (err) {
        console.error('Lỗi khi thêm pet mới:', err);
        return res.status(500).send('Đã xảy ra lỗi khi thêm pet mới');
      }
      console.log('Pet mới đã được thêm vào cơ sở dữ liệu:', result);

      // Trả về phản hồi cho client
      res.json({
        success: true,
        message: 'Pet mới đã được thêm vào cơ sở dữ liệu',
      });
    });
  },
};

module.exports = petController;