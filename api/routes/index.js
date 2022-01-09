// import routes
const UserRouter = require("./UserRouter")
const AccountRouter = require("./AccountRouter")

module.exports = (app) => {

    // routes
    app.use("/user", UserRouter);
    app.use("/account", AccountRouter);
};
