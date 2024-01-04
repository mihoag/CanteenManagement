class dashBoardController {
    async showPage(req, res, next) {
      try {
        res.render("admin/dashboard", {
          layout: "adminLayout",
          title: "DashBoard",
          css: "marketing",
          js: "marketing",
        });
      } catch (error) {
        next(error);
      }
    }
  }
  module.exports =new dashBoardController();;
  