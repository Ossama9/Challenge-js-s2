const genericRouter = require("./generic");
const PaymentController = require("../controllers/payment");
const UserService = require("../services/user");

module.exports = new genericRouter(new PaymentController(new UserService()));
