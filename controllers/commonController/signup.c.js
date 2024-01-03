const Bcrypt = require("bcryptjs");
const user = require("../../model/user.m");
class signupController {
  async showSignUp(req, res, next) {
    try {
      res.render("common/signup");
    } catch (error) {
      next(error);
    }
  }

  async processSignup(req, res, next) {
    try {
      const { email, username, password, fullname } = req.body;
      let errors = [];
      let checkExistUsername = await user.checkExistUsername(username);

      // console.log(checkExistUsername)
      if (checkExistUsername) {
        errors.push({ msg: "Username existed" });
        res.render("common/signup", {
          errors,
          username,
          fullname,
          email,
          password,
        });
      } else {
        var u = "";
        let id = await user.selectMaxID();
        if (!id) {
          u = new user(
            1,
            username,
            password,
            fullname,
            email,
            null,
            null,
            null,
            process.env.ROLE_USER,
            true,
            process.env.money
          );
        } else {
          u = new user(
            parseInt(id) + 1,
            username,
            password,
            fullname,
            email,
            null,
            null,
            null,
            process.env.ROLE_USER,
            true,
            process.env.money
          );
        }
        Bcrypt.genSalt(10, async (err, salt) => {
          Bcrypt.hash(u.password, salt, async (err, hash) => {
            if (err) throw err;
            u.password = hash;
            //console.log(hash);
            //return hash;
            let check = await user.insertAccount(u);
            // console.log(check);
            if (check > 0) {
              let success = [];
              success.push({
                msg: "Register success! Please login to enter dashboard",
              });
              res.render("common/login", { success });
            }
          });
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new signupController();
