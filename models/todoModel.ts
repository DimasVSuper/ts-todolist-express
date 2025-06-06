import { db } from "../db";

export interface Todo {
  id: number;
  task: string;
  completed: "belum" | "selesai";
  created_at: Date;
}

export class TodoModel {
  static async getAll(): Promise<Todo[]> {
    const [rows] = await db.query("SELECT * FROM todos");
    return rows as Todo[];
  }

  static async create(task: string): Promise<Todo> {
    const [result]: any = await db.query(
      "INSERT INTO todos (task, completed) VALUES (?, ?)",
      [task, "belum"]
    );
    const [rows] = await db.query("SELECT * FROM todos WHERE id = ?", [result.insertId]);
    return (rows as Todo[])[0];
  }

  static async toggle(id: number): Promise<Todo | null> {
    // Ambil status sekarang
    const [rows] = await db.query("SELECT completed FROM todos WHERE id = ?", [id]);
    const current = (rows as any[])[0]?.completed;
    if (!current) return null;
    const next = current === "belum" ? "selesai" : "belum";
    await db.query("UPDATE todos SET completed = ? WHERE id = ?", [next, id]);
    const [updated] = await db.query("SELECT * FROM todos WHERE id = ?", [id]);
    return (updated as Todo[])[0] || null;
  }

  static async update(id: number, task: string): Promise<Todo | null> {
    await db.query("UPDATE todos SET task = ? WHERE id = ?", [task, id]);
    const [rows] = await db.query("SELECT * FROM todos WHERE id = ?", [id]);
    return (rows as Todo[])[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const [result]: any = await db.query("DELETE FROM todos WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}