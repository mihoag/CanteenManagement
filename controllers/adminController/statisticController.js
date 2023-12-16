class statictisController {
  async showStatisticsPage1(req, res, next) {
    try {
      res.render("admin/statistics/1", { layout: "adminLayout" });
    } catch (error) {
      next(error);
    }
  }
  async showStatisticsPage2(req, res, next) {
    try {
      res.render("admin/statistics/2", { layout: "adminLayout" });
    } catch (error) {
      next(error);
    }
  }
  async showStatisticsPage3(req, res, next) {
    try {
      res.render("admin/statistics/3", { layout: "adminLayout" });
    } catch (error) {
      next(error);
    }
  }
  async showStatisticsPage4(req, res, next) {
    try {
      res.render("admin/statistics/4", { layout: "adminLayout" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new statictisController();
