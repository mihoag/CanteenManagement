module.exports = {
  authentication: async (req, res, next) => {
    try {
      if (req.session.isAuthenticated) {
        return next();
      } else {
        return res.redirect("/");
      }
    } catch (error) {
      next(error);
    }
  },
  authorization: async (req, res, next) => {
    if (req.session.isAuthenticated && req.session.role) {
      let originalUrl = req.originalUrl;
      let role = req.session.role;
      if (originalUrl.startsWith(`/${role}`)) {
        next();
      } else {
        res.render("error/403", { layout: false });
      }
    }
  },
  mustLogin: async (req, res, next) => {
    if (!req.session.isAuthenticated) {
      return next();
    }
    let role = req.session.role;
    return res.redirect(`/${role}`);
  },
};
