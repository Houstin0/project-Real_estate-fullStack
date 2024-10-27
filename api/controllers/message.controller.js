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



export const deleteMessage = async (req, res) => {
  const { messageId } = req.params; // Extract message ID from route parameters
  const userId = req.userId;

  try {
    // Find the message to check if the user is the sender
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }

    // Check if the user is the sender of the message
    if (message.senderId !== userId) {
      return res.status(403).json({ error: "You can only delete your own messages." });
    }

    // Delete the message if the senderId matches userId
    await prisma.message.delete({
      where: { id: messageId },
    });

    res.status(200).json({ message: "Message deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting message." });
  }
};
