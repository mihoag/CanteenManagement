exports.showCart = async (req, res, next) => {
  try {
    res.render("user/cart", { layout: "userLayout", script: "cartOrder" });
  } catch (err) {
    next(err);
  }
};
