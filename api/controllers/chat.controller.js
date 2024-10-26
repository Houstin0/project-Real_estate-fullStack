import prisma from "../lib/prisma.js";


export const getConversations = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [{ user1Id: tokenUserId }, { user2Id: tokenUserId }],
      },
      include: {
        user1: { select: { id: true, username: true } },
        user2: { select: { id: true, username: true } },
      },
    });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching conversations" });
  }
};


export const getMessages = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      include: {
        
        sender: { select: { username: true } },          
        receiver: { select: { username: true } },         
       
      }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};









// export const getChats = async (req, res) => {
//   const tokenUserId = req.userId;

//   try {
//     const chats = await prisma.chat.findMany({
//       where: {
//         userIDs: {
//           hasSome: [tokenUserId],
//         },
//       },
//     });

//     for (const chat of chats) {
//       const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

//       const receiver = await prisma.user.findUnique({
//         where: {
//           id: receiverId,
//         },
//         select: {
//           id: true,
//           username: true,
//           avatar: true,
//         },
//       });
//       chat.receiver = receiver;
//     }

//     res.status(200).json(chats);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to get chats!" });
//   }
// };

// export const getChat = async (req, res) => {
//   const tokenUserId = req.userId;

//   try {
//     const chat = await prisma.chat.findUnique({
//       where: {
//         id: req.params.id,
//         userIDs: {
//           hasSome: [tokenUserId],
//         },
//       },
//       include: {
//         messages: {
//           orderBy: {
//             createdAt: "asc",
//           },
//         },
//       },
//     });

//     await prisma.chat.update({
//       where: {
//         id: req.params.id,
//       },
//       data: {
//         seenBy: {
//           push: [tokenUserId],
//         },
//       },
//     });
//     res.status(200).json(chat);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to get chat!" });
//   }
// };

// export const addChat = async (req, res) => {
//   const tokenUserId = req.userId;
//   try {
//     const newChat = await prisma.chat.create({
//       data: {
//         userIDs: [tokenUserId, req.body.receiverId],
//       },
//     });
//     res.status(200).json(newChat);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to add chat!" });
//   }
// };

// export const readChat = async (req, res) => {
//   const tokenUserId = req.userId;

  
//   try {
//     const chat = await prisma.chat.update({
//       where: {
//         id: req.params.id,
//         userIDs: {
//           hasSome: [tokenUserId],
//         },
//       },
//       data: {
//         seenBy: {
//           set: [tokenUserId],
//         },
//       },
//     });
//     res.status(200).json(chat);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to read chat!" });
//   }
// };
