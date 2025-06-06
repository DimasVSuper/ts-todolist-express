import { Request, Response } from "express";
import { TodoModel } from "../models/todoModel";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await TodoModel.getAll();
    res.json(todos);
  } catch (err) {
    console.error(err); // Tambahkan ini untuk debug
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const { task } = req.body;
  if (!task) {
    res.status(400).json({ error: "Task is required" });
    return;
  }
  try {
    const todo = await TodoModel.create(task);
    res.status(201).json(todo);
  } catch (err) {
    console.error(err); // Tambahkan ini untuk debug
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const toggleTodo = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  try {
    const todo = await TodoModel.toggle(id);
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle todo" });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { task } = req.body;
  if (isNaN(id) || !task) {
    res.status(400).json({ error: "Invalid ID or task" });
    return;
  }
  try {
    const todo = await TodoModel.update(id, task);
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  try {
    const success = await TodoModel.delete(id);
    if (!success) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};