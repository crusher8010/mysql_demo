const { create, getUsers, getSingleUser, updateUser, deleteUser, getUserByEmail } = require("./userService");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    const body = req.body;

    const salt = genSaltSync(5);
    body.password = hashSync(body.password, salt)

    create(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                stat: "fail",
                message: "Database Connection Error!"
            })
        }

        return res.status(200).json({
            stat: "success",
            results
        })
    })
}

exports.getUsers = (req, res) => {
    getUsers((err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                stat: "fail",
                message: "Database Connection Error!"
            })
        }

        return res.status(200).json({
            stat: "success",
            results
        })
    })
}

exports.SingleUser = (req, res) => {
    let id = req.params.id;

    getSingleUser(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                stat: "fail",
                message: "Database Connection Error!"
            })
        }

        if (!results) {
            return res.status(500).json({
                state: "fail",
                message: "Record not found!"
            })
        }

        return res.status(200).json({
            stat: "success",
            results
        })
    })
}

exports.UpdateUser = (req, res) => {
    let id = req.params.id
    let body = { ...req.body, id };

    updateUser(body, (err, results) => {
        if (err) {
            return res.status(500).json({
                state: "fail",
                message: "Data Connection Error!"
            });
        }

        if (!results) {
            return res.status(500).json({
                state: "fail",
                message: "Not able to update!"
            })
        }

        return res.status(200).json({
            state: "success",
            results
        })
    })
}

exports.RemoveUser = (req, res) => {
    let id = req.params.id;

    deleteUser(id, (err, results) => {
        if (err) {
            return res.status(500).json({
                state: "fail",
                message: "Data Connection Error!"
            });
        }

        return res.status(200).json({
            state: "success",
            message: "Deleted Successfully!"
        })
    })
}

exports.Login = (req, res) => {
    const body = req.body;

    getUserByEmail(body.email, (err, results) => {
        if (err) {
            return res.statsu(500).json({
                state: "fail",
                message: "Wrong Crendentials!"
            })
        }

        if (results.length == 0) {
            return res.status(500).json({
                state: "success",
                message: "Invalid email or password!"
            })
        }

        const temp = compareSync(body.password, results[0].password);
        if (temp) {
            results.password = undefined;
            const token = sign({ temp: results }, "fantastic")

            return res.status(200).json({
                state: "success",
                data: results[0],
                token
            })
        } else {
            return res.status(500).json({
                state: "success",
                message: "Wrong Crendentials!"
            })
        }
    })
}