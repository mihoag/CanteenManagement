const my_cloudinary = require("../../configs/myCloundinary");
const { sendMail } = require("../../utils/sendEmail.u");

class marketingController {
  async showPage(req, res, next) {
    try {
      res.render("admin/marketing", {
        layout: "adminLayout",
        isMarketing: true,
        title: "Marketing",
        css: "marketing",
        js: "marketing",
      });
    } catch (error) {
      next(error);
    }
  }
  async handlePost(req, res, next) {
    try {
      if (!req.file) {
        return res.json({ message: "Vui lòng chọn ảnh minh họa", success: false });
      }

      const newEmail = req.body;
      newEmail.detail = JSON.parse(newEmail.detail);
      const { url, public_id } = await my_cloudinary.push(req.file.path);
      newEmail.image = url;
      newEmail.public_id = public_id;

      await sendMail(newEmail);
      return res.json({ message: "Đã gửi thông tin món mới đến khách hàng", success: true });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new marketingController();
