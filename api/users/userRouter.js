const { createUser, getUsers, SingleUser, UpdateUser, RemoveUser, Login } = require("./userController");
const { Check } = require("../../auth/validation");
const router = require("express").Router();

router.route("/").get(Check, getUsers).post(createUser);
router.route("/login").post(Login);
router.route("/:id").get(Check, SingleUser).patch(Check, UpdateUser).delete(Check, RemoveUser);

module.exports = router;