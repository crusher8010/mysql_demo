const pool = require("../../Config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `INSERT INTO registration(fullname, email, contact, password)
            VALUES (?, ?, ?, ?) `,
            [
                data.fullname, data.email, data.contact, data.password
            ],
            async (error, results) => {
                if (error) {
                    return callback(error)
                }

                let id = results.insertId;
                const [rows] = await pool.promise().query(`SELECT * FROM registration WHERE id = ?`, [id]);
                results = rows
                return callback(null, results);
            }
        )
    },

    getUsers: callback => {
        pool.query(`SELECT * FROM registration`,
            [],
            (error, results) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    getSingleUser: (id, callback) => {
        pool.query(`SELECT * FROM registration WHERE id=?`,
            [id],
            (error, results) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    updateUser: async (data, callback) => {
        const [rows] = await pool.promise().query(`SELECT * FROM registration WHERE id = ?`, [data.id]);
        let temp = rows[0];

        let obj = Object.assign({}, temp, data);

        pool.query(`UPDATE registration SET fullname=?, email=?, contact=? WHERE id=?`,
            [
                obj.fullname, obj.email, obj.contact, obj.id
            ],
            async (error, results) => {
                if (error) {
                    return callback(error);
                }

                const [rows] = await pool.promise().query(`SELECT * FROM registration WHERE id = ?`, [data.id]);
                results = rows;
                return callback(null, results);
            }
        );
    },

    deleteUser: async (id, callback) => {
        pool.query(`DELETE FROM registration WHERE id=?`,
            [id],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                console.log(results);
                return callback(null, results);
            })
    },

    getUserByEmail: (email, callback) => {
        pool.query(`SELECT * FROM registration WHERE email = ?`,
            [email],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        )
    }
}