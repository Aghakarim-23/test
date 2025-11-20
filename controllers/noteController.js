import Note from "../models/Note.js";

// createNote
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = {
      title,
      content,
      userId: req.user.id,
    };
    const note = await Note.create(newNote);

    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    console.error(error);
  }
};

// getUsersAllnote
export const getUserNotes = async (req, res) => {
  try {
    const note = await Note.find({ userId: req.user.id });
    res.status(200).json({
      message: "Notes fetched successfully",
      data: {
        count: note.length,
        notes: note,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

// getSingleNote

export const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note is not found" });
    console.log(note);
    res.json(note);
  } catch (error) {
    console.error(error);
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()
    res.json({data: {
        count: notes.length,
        notes: notes
    }})
  } catch (error) {
    console.error(error);
  }
};
