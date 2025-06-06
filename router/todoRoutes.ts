import { Router } from "express";
import { getTodos, createTodo, toggleTodo, updateTodo, deleteTodo } from "../controllers/todoController";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id/toggle", toggleTodo);
router.put("/:id", updateTodo);      // <-- Tambah update
router.delete("/:id", deleteTodo);   // <-- Tambah delete

export default router;