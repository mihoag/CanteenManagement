require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const app = express();
const route = require("./routes");


app.use(
    session({
        secret: "secret-key-123",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    })
);

const handlebars = exphbs.create({
    // tạo handlebars với những config
    extname: ".hbs",
    defaultLayout: "main",
    helpers:
    {
        showError: (errors) => {
            let data = '';
            if (typeof errors !== 'undefined') {
                for (let i = 0; i < errors.length; i++) {
                    data += `<div class="alert alert-danger" role="alert">
                ${errors[i].msg}
                </div>`
                }
            }
            return data;
        },
        formatValue: (value) => {
            if (typeof value === undefined) {
                return '';
            }
            return value;
        },
        showSuccess: (success) => {
            let data = '';
            if (typeof success !== 'undefined') {
                for (let i = 0; i < success.length; i++) {
                    data += `<div class="alert alert-success" role="alert">
                      ${success[i].msg}
                </div>`
                }
            }
            //console.log(data);
            return data;
        },
        compare: (id1, id2) => {
            if (id2 === undefined) {
                return "selected";
            }
            else {
                return id1 === id2 ? "selected" : "";
            }
        },
        progressbar: (index) => {
            let data = '';
            for (let i = 0; i < index; i++) {
                data += ` <div class="progress-bar bg-secondary" role="progressbar" style="width: 18.5%; " aria-valuenow="25"
                aria-valuemin="0" aria-valuemax="100"></div>`;
            }
            return data;
        }
    }
});

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/user', express.static(path.join(__dirname, "public")))
app.use('/user/menu', express.static(path.join(__dirname, "public")))
app.use('/admin', express.static(path.join(__dirname, "public")))
// routes
route(app);

const PORT_SERVER = process.env.PORT_SERVER || 3000;
app.listen(PORT_SERVER, () => {
    console.log(`Server is running on port ${PORT_SERVER}`);
});
