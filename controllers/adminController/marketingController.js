class marketingController {
  async showPage(req, res, next) {
    try {
      res.render("admin/marketing", { 
        layout: "adminLayout",
        isMarketing: true
      });
    } catch (error) {
      next(error);
    }
  }
  async showStatisticsPage1(req, res, next) {
    try {
      res.render("admin/statistic/1", { layout: "adminLayout" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new marketingController();
