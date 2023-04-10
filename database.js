const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQLDB
}).promise()

const getNotes = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM notes");
        return rows;
    } catch (err) {
        console.log(err)
    }
}

const oneNotes = async (id) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
        return rows;
    } catch (err) {
        console.log(err)
    }
}

const createNote = async (title, content) => {
    try {
        const [temp] = await pool.query(`
           INSERT INTO notes(title, content)
           VALUES(?, ?)
        `, [title, content]);
        let id = temp.insertId;
        return oneNotes(id);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getNotes, oneNotes, createNote }
// oneNotes(2);

// createNote("Eagle", "Eagle is the common name for many large birds of prey of the family Accipitridae. Eagles belong to several groups of genera, some of which are closely related. Most of the 68 species of eagles are from Eurasia and Africa.")