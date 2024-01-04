
const cartModel = require('../../model/cart.m');
exports.showCart = async (req, res, next) => {
  try {
    res.render("user/cart", { layout: "userLayout", script: "cartOrder" });
  } catch (err) {
    next(err);
  }
};

exports.AddItemToCart = async (req, res, next) => {
  try {
    const {FoodId} = req.params
    const username = req.session.username;
    await cartModel.addFood(FoodId,username);
    res.redirect("/user/cart")
  } catch (err) {
    next(err);
  }
};
