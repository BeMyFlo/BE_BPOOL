import Profiles, { profileModel } from "../../model/profile.js";

export const updateInfo = async (req, res) => {
    try {
      const userId = req.user._id;
      console.log(userId);
      const user = await Profiles.findOne({ userId: userId  });

      if (!user) {
        return res.status(404).json({ error: "Không tìm thấy người dùng" });
      }
  
      if (req.body.email) user.email = req.body.email;
      if (req.body.name) user.name = req.body.name;
      if (req.body.address) user.address = req.body.address;
      if (req.body.phone) user.phone = req.body.phone;
  
      const updatedProfile = await user.save();
  
      res.status(200).json({ success: true, data: updatedProfile });
    } catch (error) {
      res.status(500).json({ error: "Đã xảy ra lỗi" });
    }
};
