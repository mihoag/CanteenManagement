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
    // console.log(username);
    const data = await cartModel.getAllItemInCart(username);
    // console.log(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.AddItemToCart = async (req, res, next) => {
  try {
    const { FoodId } = req.params;
    const username = req.session.username;
   const check =  await cartModel.addFood(FoodId, username);
   if(check)
    return res.json({ message: "Một mặt hàng mới đã được thêm vào giỏ !", success: true })
    return res.json({ message: "Có lỗi xảy ra vui lòng thử lại !", success: false })
  } catch (err) {
    next(err);
  }
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const username = req.session.username;
    // console.log(req.body);
    const { cartId, itemId } = req.body;
    await cartModel.deleteCartItem(username, cartId, itemId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
