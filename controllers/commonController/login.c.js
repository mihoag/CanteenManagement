const user = require('../../model/user.m')
const Bcrypt = require('bcryptjs')
class signinController {
    async showLogin(req, res, next) {
        try {

            res.render("common/login");
        } catch (error) {
            next(error);
        }
    }

    async processLogin(req, res, next) {
        try {
            console.log(req.body);
            const { username, password } = req.body;
            // console.log(req.body)
            let data = []
            data = await user.selectByUsername(username);
            let errors = [];
            //console.log(data);
            // console.log(data);
            // Neu khong co email hop le, thi data la mot mang rong
            if (!data) {
                errors.push({ msg: 'Username not found' });
                res.render('common/login', { errors, username, password });
            }
            else {
                Bcrypt.compare(password, data.password, (err, isMatch) => {
                    if (err) throw err;
                    if (!isMatch) {
                        errors.push({ msg: 'Password is incorrect' });
                        res.render('common/login', { errors, username, password });
                    } else {
                        //return done(null, false, { message: 'Password incorrect' });
                        // 
                        if (req.body.remember == 'on') {
                            req.session.cookie.maxAge = 10 * 24 * 60 * 60 * 1000; // 10 ngay
                        }

                        let sess = req.session;
                        sess.isAuthenticated = true;
                        sess.username = username;

                        sess.name = data.name;
                        sess.role = data.role;
                        res.redirect('/user');
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    }

}
module.exports = new signinController;