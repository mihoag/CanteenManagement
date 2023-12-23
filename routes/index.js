const loginRoute = require("./common/login.r");
const signupRoute = require("./common/signup.r");
const userRoute = require("./user/user.r");
const adminRoute = require("./admin");
const auth = require("../middlewarefunction/auth");
const logoutRoute = require("./common/logout.r");

function route(app) {
  app.use("/user", auth.authentication, auth.authorization, userRoute);
  // app.use("/admin", auth.authentication, auth.authorization, adminRoute);
  app.use("/admin", adminRoute);
  app.use("/logout", logoutRoute);
  app.use("/signup", signupRoute);
  app.use("/", auth.mustLogin, loginRoute);
}
module.exports = route;
