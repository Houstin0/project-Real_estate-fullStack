import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const { conversationId, senderId, receiverId, content } = req.body; // Extract data from request body

  if (!conversationId || !senderId || !receiverId || !content) {
    return res.status(400).json({ error: "All fields are required." }); // Validate input
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        receiverId,
        content,
      },
    });
    
    res.status(201).json(newMessage); // Respond with the newly created message
  } catch (error) {
    res.status(500).json({ error: "Error adding message" });
  }
};