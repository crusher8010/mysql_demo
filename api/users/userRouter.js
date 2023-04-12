const { createUser, getUsers, SingleUser, UpdateUser, RemoveUser, Login } = require("./userController");
const { Check } = require("../../auth/validation");
const router = require("express").Router();

router.route("/").get(getUsers).post(createUser);
router.route("/login").post(Login);
router.route("/:id").get(SingleUser).patch(Check, UpdateUser).delete(Check, RemoveUser);

module.exports = router;