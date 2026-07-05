import { Router } from "express";
import multer from "multer";
import User from "../model/user.model.js";
import Notes from "../model/notes.model.js";
import auth from "../middleware/auth.js";
import path from "path";
import { error } from "console";

const storage = multer.diskStorage({
  destination: (req, file, cp) => cp(null, "./notes"),
  filename: (req, file, cp) => {
    const unique = Date.now + "-" + Math.round(Math.random() * 1e9);
    cp(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cp) => {
    const allowed = /pdf|jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    ext ? cp(null, true) : cp(new Error("Only PDF and images allowed"));
  },
});

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const notes = Notes.find({
      $or: [{ owner: req.user.id }, { "collaborators.user": req.user.id }],
    })
      .select("-contect")
      .sort({ updatedAt: -1 });

    res.json({ notes });
  } catch (error) {
    console.log("error in home route", error);

    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", auth, async (req, res) => {
  const note = Notes.findById(req.params.id)
    .populate("owner", "username")
    .populate("collaborators.user", "username");

  if (!note) return res.status(404).json({ message: "Note not found" });
  const isOwner = note.owner._id.toString() === req.user.id;
  const isCollab = note.collaborators.some(
    (c) => c.user._id.toString() == req.user.id,
  );
  if (!isOwner && !isCollab)
    return res.status(403).json({ message: "Access denied" });
  res.json(note);
});

router.get("/shar/:id", async (req, res) => {
  const note = await Notes.findOne({
    shareLink: req.params.token,
    isPublic: true,
  }).populate("owner", "username");
  if (!note)
    return res.status(404).json({ message: "Note not found or not public" });
  res.json(note);
});

// create note
router.post("/", auth, async (req, res) => {
  const note = await Notes.create({ owner: req.user.id });
  res.status(201).json(note);
});

// update note content/ title
router.put("/:id", auth, async (req, res) => {
  const note = await Notes.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Not found" });

  const isOwner = note.owner.toString() === req.user.id;
  const isCollab = note.collaborators.some(
    (c) => c.user.toString() === req.user.id,
  );
  if (!isCollab && !isOwner)
    return res.status(403).json({ message: "Access deined" });
  const { title, content } = req.body;
  if (title !== undefined) note.title = title;
  if (content !== undefined) note.content = content;

  await note.save();
  res.json(note);
});

//upload file to a note
router.post();

//
router.post();

// delete note
router.delete("/:id", auth, async (req, res) => {
  const note = await Notes.findOnAndDelete({
    _id: req.params.id,
    owner: req.user.id,
  });
  if (!note)
    return res.status(403).json({ message: "Only owner can delete notes" });
  res.json({ message: "Note deleted" });
});

export default router;
