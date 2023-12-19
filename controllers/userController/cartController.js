exports.showCart = async (req, res, next) => {
  try {
    res.render("user/cart", { layout: "userLayout" });
  } catch (err) {
    next(err);
  }
};
