const cartModel = require("../../model/cart.m");

exports.showCart = async (req, res, next) => {
  try {
    res.render("user/cart", { layout: "userLayout", script: "cartOrder" });
  } catch (err) {
    next(err);
  }
};

exports.getAllCartItems = async (req, res, next) => {
  try {
    const username = req.session.username;
    const data = await cartModel.getAllItemInCart(username);
    return data;
  } catch (err) {
    next(err);
  }
};
