const statisticsM = require("../../model/statistics.m");

class statictisController {
  async showStatisticsPage1(req, res, next) {
    try {
      res.render("admin/statistics/1", {
        layout: "adminLayout", title: "Statistics", isStatistics: true, css: 'statistics',
        js: 'statistics'
      });
    } catch (error) {
      next(error);
    }
  }
  async showStatisticsPage2(req, res, next) {
    try {
      res.render("admin/statistics/2", {
        layout: "adminLayout", title: "Statistics", isStatistics: true, css: 'statistics',
        js: 'statistics2'
      });
    } catch (error) {
      next(error);
    }
  }
  async showStatisticsPage3(req, res, next) {
    try {
      const data = await statisticsM.getNumberProductInStock();
      data.revenue = (await statisticsM.getTodayRevenue()).sum || 0;
      data.revenueMonth = (await statisticsM.getMonthRevenue()).sum || 0;

      res.render("admin/statistics/3", {
        layout: "adminLayout", title: "Statistics", isStatistics: true, css: 'statistics',
        js: 'statistics3',
        data
      });
    } catch (error) {
      next(error);
    }
  }
  async showStatisticsPage4(req, res, next) {
    try {
      res.render("admin/statistics/4", {
        layout: "adminLayout", title: "Statistics", isStatistics: true, css: 'statistics',
        js: 'statistics4'
      });
    } catch (error) {
      next(error);
    }
  }
  async getDataRevenue(req, res, next) {
    try {
      const rs = await statisticsM.getRevenue();
      res.json(rs);
    } catch (error) {
      next(error);
    }
  }
  async getStas4(req, res, next) {
    try {
      const rs = await statisticsM.getStas4();
      res.json(rs);
    } catch (error) {
      next(error);
    }
  }
  async getData4Table(req, res, next) {
    try {
      const page = parseInt(req.params.page)
      const rs = await statisticsM.getStas4Table();
      const data = [];
      for (let i = (page - 1) * 10; i < Math.min(page * 10, rs.length); i++) {
        data.push(rs[i]);
      }
      let totalPage = parseInt(parseInt(rs.length) / 10);
      if (rs.length % 10 != 0) {
        totalPage++;
      }

      res.json({ data, page, totalPage });
    } catch (error) {
      next(error);
    }
  }
  async getData2Table(req, res, next) {
    try {
      let { page, month, year } = req.params
      month = parseInt(month)
      year = parseInt(year)
      const rs = await statisticsM.getStas2Table(month, year);
      const data = [];
      for (let i = (page - 1) * 10; i < Math.min(page * 10, rs.length); i++) {
        data.push(rs[i]);
      }
      let totalPage = parseInt(parseInt(rs.length) / 10);
      if (rs.length % 10 != 0) {
        totalPage++;
      }

      res.json({ data, page, totalPage, rs });
    } catch (error) {
      next(error);
    }
  }
  async getDataRevenueWeek(req, res, next) {
    try {
      let { from, to } = req.params
      const rs = await statisticsM.getRevenueWeek(from, to);
      res.json(rs);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new statictisController();
