const express = require("express");
const { getNotes, oneNotes, createNote } = require("./database")
const app = express();
app.use(express.json());

app.get("/notes", async (req, res) => {
    const notes = await getNotes();
    res.status(200).json({
        result: "success",
        notes
    })
})

app.get("/notes/:id", async (req, res) => {
    let id = req.params.id
    const notes = await oneNotes(id);
    res.status(200).json({
        result: "success",
        notes
    })
})

app.post("/notes", async (req, res) => {
    const { title, content } = req.body

    const addNote = await createNote(title, content);

    res.status(201).json({
        result: "success",
        addNote
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8000, () => {
    console.log("Server is running on 8000 port.....")
});
