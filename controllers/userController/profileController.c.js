const userM = require("../../model/user.m");

class profileController {
  async showProfile(req, res, next) {
    try {
      const data = await userM.getEmailByUsername(req.session?.username);
      const { name, email, money } = data[0];
      res.render("user/profile", { layout: "userLayout", name, email, money: money });
    } catch (error) {
      next(error);
    }
  }

  async editProfile(req, res, next) {
    try {
      const { name } = req.body;
      const data = await userM.getEmailByUsername(req.session?.username);
      data[0].name = name;
      await userM.updateProfile(data[0]);
      res.redirect("/user/profile");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new profileController();
