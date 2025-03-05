import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Insert test data when the server starts
async function insertTestData() {
  try {
    // Check if there are already notes in the database
    const existingNotes = await prisma.note.findMany();
    if (existingNotes.length === 0) {
      // Insert test notes if the database is empty
      await prisma.note.createMany({
        data: [
          { title: "Note 1", content: "This is the first note." },
          { title: "Note 2", content: "This is the second note." },
          { title: "Note 3", content: "This is the third note." },
        ],
      });
      console.log("Test data inserted successfully!");
    } else {
      console.log("Database already contains notes. Skipping test data insertion.");
    }
  } catch (error) {
    console.error("Error inserting test data:", error);
  }
}

// Fetch all notes
app.get("/api/notes", async (req: Request, res: Response) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

// Start the server
app.listen(5001, async () => {
  console.log("Server running on http://localhost:5001");
  await insertTestData(); // Insert test data when the server starts
});